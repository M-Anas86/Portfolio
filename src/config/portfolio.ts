export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface FeaturedProjectConfig {
  id: string;
  name: string;
  repoMatchPatterns: string[];
  title: string;
  technologies: string[];
  description: string;
  highlights: string[];
  demoUrl?: string;
  architectureNotes?: string;
}

export interface PortfolioConfig {
  name: string;
  title: string;
  headline: string;
  location: string;
  university: string;
  universityFull: string;
  degree: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  introduction: string;
  shortBio: string;
  careerGoal: string;
  typingRoles: string[];
  skills: Record<string, SkillCategory>;
  featuredProjects: FeaturedProjectConfig[];
  socialLinks: {
    name: string;
    url: string;
    icon: string;
  }[];
}

export const portfolioConfig: PortfolioConfig = {
  name: "Mohammad Anas",
  title: "Java Backend Developer",
  headline: "Java Backend Developer | Spring Boot | REST APIs",
  location: "Hyderabad, India",
  degree: "Master of Computer Applications (MCA)",
  university: "MANUU, Hyderabad",
  universityFull: "Maulana Azad National Urdu University (MANUU), Hyderabad, Telangana, India",
  email: "mohdanas406261@gmail.com",
  githubUsername: "M-Anas86",
  githubUrl: "https://github.com/M-Anas86",
  linkedinUrl: "https://www.linkedin.com/in/mohd-anas-276929332/",
  resumeUrl: "/resume.pdf",
  introduction:
    "I am an MCA student and aspiring Java Backend Developer passionate about building reliable backend systems, REST APIs and scalable applications. I enjoy problem-solving and working with Java, Spring Boot, databases and modern development tools.",
  shortBio:
    "I build backend applications, REST APIs and scalable systems using Java and modern technologies.",
  careerGoal: "Java Backend Developer / Software Engineer",
  typingRoles: [
    "Java Backend Developer",
    "Spring Boot Developer",
    "Software Engineer",
    "Problem Solver",
  ],
  skills: {
    programming: {
      title: "Programming",
      skills: ["Java", "JavaScript", "C"],
    },
    backend: {
      title: "Backend",
      skills: [
        "Spring Boot",
        "Spring MVC",
        "Spring Security",
        "REST APIs",
        "JWT",
        "Hibernate",
        "JPA",
      ],
    },
    database: {
      title: "Database",
      skills: ["MySQL", "H2"],
    },
    frontend: {
      title: "Frontend",
      skills: ["React", "HTML", "CSS", "Tailwind CSS"],
    },
    tools: {
      title: "Tools",
      skills: [
        "Git",
        "GitHub",
        "Maven",
        "Swagger",
        "Postman",
        "IntelliJ IDEA",
      ],
    },
    concepts: {
      title: "Concepts",
      skills: [
        "OOP",
        "DSA",
        "Microservices",
        "Authentication",
        "API Design",
      ],
    },
  },
  featuredProjects: [
    {
      id: "distributed-job-scheduler",
      name: "Distributed Job Scheduler",
      repoMatchPatterns: ["distributed-job-scheduler", "job-scheduler", "scheduler"],
      title: "Distributed Job Scheduler",
      technologies: ["Java", "Spring Boot", "React", "MySQL"],
      description:
        "Distributed job scheduling system with worker management, priorities, retry mechanisms and dead-letter queue.",
      highlights: [
        "Dynamic task dispatching with configurable worker thread pools",
        "Priority queue processing with exponential backoff retry policies",
        "Dead-letter queue (DLQ) for inspecting and recovering failed jobs",
        "Spring Boot RESTful status and monitoring endpoints",
      ],
      architectureNotes:
        "Engineered with modular producer-consumer queues, heartbeats for active worker liveness, and atomic job status updates.",
    },
    {
      id: "ecommerce-backend",
      name: "E-Commerce Backend",
      repoMatchPatterns: ["e-commerce", "ecommerce-backend", "ecommerce", "student-management-api"],
      title: "E-Commerce Backend",
      technologies: ["Java", "Spring Boot", "REST APIs", "MySQL", "JWT"],
      description:
        "Backend application with authentication, product management, cart and order management.",
      highlights: [
        "Clean layered architecture: Controllers, Services, Repositories, and DTOs",
        "JWT-based stateless authentication and role-based endpoint security",
        "Relational entity mapping with Hibernate & Spring Data JPA",
        "Documented interactive endpoints with Swagger UI / OpenAPI specification",
      ],
      demoUrl: "https://e-commerce-tau-three-62.vercel.app",
      architectureNotes:
        "Stateless REST service designed for high concurrency with transactional boundary management on checkout & order operations.",
    },
    {
      id: "jwt-authentication-api",
      name: "JWT Authentication API",
      repoMatchPatterns: ["jwt-auth", "jwt-authentication", "spring-security-jwt"],
      title: "JWT Authentication API",
      technologies: ["Java", "Spring Boot", "Spring Security", "JWT"],
      description:
        "Secure authentication and authorization API built with Spring Boot and Spring Security filters.",
      highlights: [
        "Custom OncePerRequestFilter for cryptographic JWT validation",
        "Refresh token rotation and secure token invalidation strategy",
        "BCrypt password hashing with fine-grained role-based authority rules",
        "Centralized global exception handling with structured API error responses",
      ],
      architectureNotes:
        "Production-grade security filter chain enforcing stateless sessions, CORS policies, and CSRF protection for modern client consumption.",
    },
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/M-Anas86",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mohd-anas-276929332/",
      icon: "linkedin",
    },
    {
      name: "Email",
      url: "mailto:mohdanas406261@gmail.com",
      icon: "mail",
    },
  ],
};
