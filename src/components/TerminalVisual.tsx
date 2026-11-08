import { useState } from 'react';
import { Terminal, Code2, Server, Play, CheckCircle2, Copy, Check } from 'lucide-react';

export function TerminalVisual() {
  const [activeTab, setActiveTab] = useState<'controller' | 'service' | 'config' | 'curl'>('controller');
  const [copied, setCopied] = useState(false);
  const [curlExecuted, setCurlExecuted] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const controllerCode = `@RestController
@RequestMapping("/api/v1/jobs")
@Tag(name = "Job Scheduler", description = "Distributed task endpoints")
public class JobSchedulerController {

    private final JobSchedulerService schedulerService;

    @Autowired
    public JobSchedulerController(JobSchedulerService service) {
        this.schedulerService = service;
    }

    @PostMapping("/dispatch")
    public ResponseEntity<JobResponseDTO> dispatchJob(
            @Valid @RequestBody JobScheduleRequest request) {
        JobResponseDTO response = schedulerService.queueTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/status/{jobId}")
    public ResponseEntity<JobStatusDTO> getStatus(@PathVariable String jobId) {
        return ResponseEntity.ok(schedulerService.checkStatus(jobId));
    }
}`;

  const serviceCode = `@Service
@Slf4j
public class JobSchedulerService {

    private final PriorityBlockingQueue<JobTask> priorityQueue;
    private final DeadLetterQueueService dlqService;

    @Transactional
    public JobResponseDTO queueTask(JobScheduleRequest req) {
        log.info("Enqueueing job: {} with priority: {}", req.getJobId(), req.getPriority());
        
        JobTask task = JobTask.builder()
            .jobId(UUID.randomUUID().toString())
            .name(req.getName())
            .payload(req.getPayload())
            .priority(req.getPriority())
            .status(JobStatus.QUEUED)
            .retryLimit(3)
            .build();

        priorityQueue.offer(task);
        return new JobResponseDTO(task.getJobId(), "QUEUED", Instant.now());
    }
}`;

  const configCode = `spring:
  application:
    name: distributed-backend-core
  datasource:
    url: jdbc:mysql://localhost:3306/backend_db?useSSL=false
    username: \${DB_USER:anas}
    password: \${DB_PASS}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate.dialect: org.hibernate.dialect.MySQL8Dialect

security:
  jwt:
    secret-key: \${JWT_SECRET}
    expiration-ms: 86400000 # 24h`;

  const copyCode = () => {
    let text = controllerCode;
    if (activeTab === 'service') text = serviceCode;
    if (activeTab === 'config') text = configCode;
    if (activeTab === 'curl') text = 'curl -X POST http://localhost:8080/api/v1/jobs/dispatch -H "Content-Type: application/json" -d \'{"name":"sync-orders","priority":"HIGH"}\'';

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeCurl = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setCurlExecuted(true);
    }, 450);
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-slate-700/60 bg-slate-900/90 shadow-2xl backdrop-blur-md overflow-hidden text-slate-300 font-mono text-xs">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-400 text-xs font-sans font-medium flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            backend-workspace — java-17 & spring-boot-3
          </span>
        </div>

        <button
          onClick={copyCode}
          aria-label="Copy snippet"
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Editor File Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-2 overflow-x-auto text-[11px]">
        <button
          onClick={() => setActiveTab('controller')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
            activeTab === 'controller'
              ? 'border-cyan-400 text-cyan-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          JobController.java
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
            activeTab === 'service'
              ? 'border-cyan-400 text-cyan-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-blue-400" />
          JobSchedulerService.java
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
            activeTab === 'config'
              ? 'border-cyan-400 text-cyan-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-purple-400" />
          application.yml
        </button>
        <button
          onClick={() => setActiveTab('curl')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium whitespace-nowrap transition-colors ${
            activeTab === 'curl'
              ? 'border-cyan-400 text-cyan-400 bg-slate-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          REST Client
        </button>
      </div>

      {/* Code Display Pane */}
      <div className="p-4 overflow-x-auto min-h-[290px] max-h-[340px] text-[12px] leading-relaxed select-text">
        {activeTab === 'controller' && (
          <pre className="text-slate-300">
            <code>
              <span className="text-purple-400">@RestController</span>{'\n'}
              <span className="text-purple-400">@RequestMapping</span>(<span className="text-emerald-300">"/api/v1/jobs"</span>){'\n'}
              <span className="text-purple-400">@Tag</span>(name = <span className="text-emerald-300">"Job Scheduler"</span>, description = <span className="text-emerald-300">"Distributed task endpoints"</span>){'\n'}
              <span className="text-blue-400">public class</span> <span className="text-amber-300 font-semibold">JobSchedulerController</span> {'{\n\n'}
              {'    '}<span className="text-blue-400">private final</span> JobSchedulerService schedulerService;{'\n\n'}
              {'    '}<span className="text-purple-400">@Autowired</span>{'\n'}
              {'    '}<span className="text-blue-400">public</span> <span className="text-amber-300">JobSchedulerController</span>(JobSchedulerService service) {'{\n'}
              {'        '}<span className="text-blue-400">this</span>.schedulerService = service;{'\n'}
              {'    }'}{'\n\n'}
              {'    '}<span className="text-purple-400">@PostMapping</span>(<span className="text-emerald-300">"/dispatch"</span>){'\n'}
              {'    '}<span className="text-blue-400">public</span> ResponseEntity&lt;JobResponseDTO&gt; dispatchJob({'\n'}
              {'            '}<span className="text-purple-400">@Valid @RequestBody</span> JobScheduleRequest request) {'{\n'}
              {'        '}JobResponseDTO response = schedulerService.queueTask(request);{'\n'}
              {'        '}<span className="text-blue-400">return</span> ResponseEntity.status(HttpStatus.CREATED).body(response);{'\n'}
              {'    }'}{'\n'}
              {'}'}
            </code>
          </pre>
        )}

        {activeTab === 'service' && (
          <pre className="text-slate-300">
            <code>
              <span className="text-purple-400">@Service</span>{'\n'}
              <span className="text-purple-400">@Slf4j</span>{'\n'}
              <span className="text-blue-400">public class</span> <span className="text-amber-300 font-semibold">JobSchedulerService</span> {'{\n\n'}
              {'    '}<span className="text-blue-400">private final</span> PriorityBlockingQueue&lt;JobTask&gt; priorityQueue;{'\n'}
              {'    '}<span className="text-blue-400">private final</span> DeadLetterQueueService dlqService;{'\n\n'}
              {'    '}<span className="text-purple-400">@Transactional</span>{'\n'}
              {'    '}<span className="text-blue-400">public</span> JobResponseDTO queueTask(JobScheduleRequest req) {'{\n'}
              {'        '}log.info(<span className="text-emerald-300">"Enqueueing job: &#123;&#125; priority: &#123;&#125;"</span>, req.getJobId(), req.getPriority());{'\n\n'}
              {'        '}JobTask task = JobTask.builder(){'\n'}
              {'            '}.jobId(UUID.randomUUID().toString()){'\n'}
              {'            '}.name(req.getName()){'\n'}
              {'            '}.priority(req.getPriority()){'\n'}
              {'            '}.status(JobStatus.QUEUED){'\n'}
              {'            '}.retryLimit(3){'\n'}
              {'            '}.build();{'\n\n'}
              {'        '}priorityQueue.offer(task);{'\n'}
              {'        '}<span className="text-blue-400">return new</span> JobResponseDTO(task.getJobId(), <span className="text-emerald-300">"QUEUED"</span>, Instant.now());{'\n'}
              {'    }'}{'\n'}
              {'}'}
            </code>
          </pre>
        )}

        {activeTab === 'config' && (
          <pre className="text-slate-300">
            <code>
              <span className="text-cyan-400">spring:</span>{'\n'}
              {'  '}<span className="text-cyan-400">application:</span>{'\n'}
              {'    '}<span className="text-slate-400">name:</span> <span className="text-emerald-300">distributed-backend-core</span>{'\n'}
              {'  '}<span className="text-cyan-400">datasource:</span>{'\n'}
              {'    '}<span className="text-slate-400">url:</span> <span className="text-emerald-300">jdbc:mysql://localhost:3306/backend_db</span>{'\n'}
              {'    '}<span className="text-slate-400">username:</span> <span className="text-emerald-300">{"${DB_USER:anas}"}</span>{'\n'}
              {'    '}<span className="text-slate-400">driver-class-name:</span> <span className="text-amber-300">com.mysql.cj.jdbc.Driver</span>{'\n'}
              {'  '}<span className="text-cyan-400">jpa:</span>{'\n'}
              {'    '}<span className="text-slate-400">hibernate.ddl-auto:</span> <span className="text-amber-300">update</span>{'\n'}
              {'    '}<span className="text-slate-400">show-sql:</span> <span className="text-blue-400">false</span>{'\n'}
              <span className="text-cyan-400">security:</span>{'\n'}
              {'  '}<span className="text-cyan-400">jwt:</span>{'\n'}
              {'    '}<span className="text-slate-400">secret-key:</span> <span className="text-emerald-300">{"${JWT_SECRET}"}</span>{'\n'}
              {'    '}<span className="text-slate-400">expiration-ms:</span> <span className="text-purple-400">86400000</span>
            </code>
          </pre>
        )}

        {activeTab === 'curl' && (
          <div className="space-y-3">
            <div className="text-slate-400">
              $ curl -X POST http://localhost:8080/api/v1/jobs/dispatch \<br />
              &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
              &nbsp;&nbsp;-d '&#123;"name":"sync-orders","priority":"HIGH"&#125;'
            </div>

            <button
              onClick={executeCurl}
              disabled={isExecuting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-[11px] transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              {isExecuting ? 'Dispatching...' : 'Simulate API Call'}
            </button>

            {curlExecuted && (
              <div className="mt-3 p-3 rounded bg-slate-950/70 border border-emerald-500/30 text-slate-300 space-y-1 text-[11px]">
                <div className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  HTTP/1.1 201 Created (38ms)
                </div>
                <div className="text-slate-500">Content-Type: application/json</div>
                <pre className="text-slate-300 pt-1">
                  {`{
  "status": "QUEUED",
  "jobId": "job_94a7e2b8-f1c0",
  "workerNode": "worker-pool-03",
  "timestamp": "${new Date().toISOString()}"
}`}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>Java 17 LTS</span>
          <span>Spring Boot 3.2.x</span>
        </div>
        <div className="text-slate-400">Git: master</div>
      </div>
    </div>
  );
}
