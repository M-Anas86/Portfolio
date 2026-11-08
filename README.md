# Mohammad Anas – Java Backend Developer Portfolio

A production-ready, fully responsive, and dynamic developer portfolio website for **Mohammad Anas** (MCA student and aspiring Java Backend Developer at Maulana Azad National Urdu University, Hyderabad).

Built strictly with a modern frontend architecture (React + Vite + Tailwind CSS + Framer Motion + Lucide React) with real-time public GitHub REST API integration.

---

## 🚀 Key Features

1. **Official GitHub REST API Integration**:
   - Fetches live repositories from `https://api.github.com/users/M-Anas86/repos?sort=updated&per_page=100`.
   - Fetches public profile telemetry from `https://api.github.com/users/M-Anas86`.
   - Fetches public events from `https://api.github.com/users/M-Anas86/events`.
   - Auto-refreshes every 5 minutes while the tab is active.
   - Manual synchronization button with human-readable "last synchronized" timestamp.
   - Smart local caching (`localStorage`) with TTL to prevent redundant requests.
   - GitHub API rate-limit detection (`x-ratelimit-remaining`, `x-ratelimit-reset`) with graceful fallback to cached data.
   - Live Demo links appear **only** when a valid `homepage` URL exists on the repository.

2. **Project Search & Multi-Criteria Filtering**:
   - Real-time search across repository names and descriptions.
   - Language filtering (Java, JavaScript, C, HTML, CSS, etc.).
   - Sorting options: Recently Updated, Most Starred, Alphabetical.
   - Toggle to exclude or include forked repositories.

3. **Featured Architectural Showcase**:
   - Dedicated highlights for core systems:
     - **Distributed Job Scheduler** (Java, Spring Boot, React, MySQL)
     - **E-Commerce Backend** (Java, Spring Boot, REST APIs, MySQL, JWT)
     - **JWT Authentication API** (Java, Spring Boot, Spring Security, JWT)
   - Dynamic repository matching against user's actual GitHub repositories.

4. **Interactive Spring Boot Code & Terminal Visual**:
   - Interactive code editor showcasing realistic Spring Boot architecture:
     - `JobController.java` (`@RestController`, `@RequestMapping`, `@PostMapping`)
     - `JobSchedulerService.java` (`@Service`, Priority Queue, DLQ, `@Transactional`)
     - `application.yml` (Datasource, JPA, JWT configuration)
     - Interactive REST client simulator dispatching mock HTTP requests with live JSON response.

5. **Dynamic GitHub Profile & Language Telemetry**:
   - Calculates actual language distribution across public repositories.
   - Public contribution activity view.
   - Public event commit log.

6. **Centralized Configuration**:
   - All profile data, contact details, social links, skills, and featured projects reside in one single file: `src/config/portfolio.ts`.

7. **Dual-Theme Support**:
   - Dark theme by default (charcoal/slate background with subtle cyan, violet, and blue accents).
   - Light theme toggle with accessible controls.
   - Seamless Tailwind CSS v4 `@custom-variant dark` support.

8. **Education & Resume**:
   - Master of Computer Applications (MCA) at MANUU, Hyderabad.
   - Configurable PDF path (`/resume.pdf`) with automated availability verification and graceful email fallback.

9. **Contact & Message Dispatch**:
   - Direct mailto generator with validated fields (Name, Email, Subject, Message).
   - "Copy Message Text" button for direct pasting into Gmail/Outlook.
   - Direct links for Email, Location (Hyderabad, India), GitHub, and LinkedIn.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion (`motion/react`)
- **API**: GitHub REST API v3 (Client-side, unauthenticated public endpoints)
- **Deployment**: Vercel

---

## 📂 Project Structure

```
├── public/
│   └── resume.pdf             # Downloadable resume document
├── src/
│   ├── components/
│   │   ├── About.tsx          # Academic & professional narrative
│   │   ├── Contact.tsx        # Contact form with validation & mailto
│   │   ├── Education.tsx      # MCA at MANUU Hyderabad timeline
│   │   ├── Footer.tsx         # Clean footer with quick links
│   │   ├── GithubActivity.tsx # Profile telemetry & language distribution
│   │   ├── Hero.tsx           # Split hero with typing effect & CTAs
│   │   ├── LoadingSkeleton.tsx# Skeletons for cards and profile
│   │   ├── Navbar.tsx         # Sticky 3-zone navigation bar
│   │   ├── ProjectCard.tsx    # Dynamic repository card
│   │   ├── ProjectModal.tsx   # Architecture details & clone command modal
│   │   ├── Projects.tsx       # Live GitHub projects, search & filters
│   │   ├── ResumeModal.tsx    # Resume verification & download dialog
│   │   ├── Skills.tsx         # Categorized skills matrix
│   │   ├── TerminalVisual.tsx # Interactive Spring Boot code IDE & prober
│   │   └── ThemeToggle.tsx    # Dark/light theme switch
│   ├── config/
│   │   └── portfolio.ts       # Centralized configuration file
│   ├── hooks/
│   │   ├── useGitHubRepos.ts  # GitHub API polling, cache & sync hook
│   │   └── useTheme.ts        # Theme persistence & HTML class sync
│   ├── services/
│   │   └── githubService.ts   # GitHub REST API client & calculators
│   ├── utils/
│   │   ├── filterProjects.ts  # Search & sorting logic
│   │   └── formatDate.ts      # Relative & calendar date formatting
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## ⚙️ Centralized Configuration Guide

To update your contact information, LinkedIn URL, email, skills, or featured projects, edit `src/config/portfolio.ts`:

```typescript
export const portfolioConfig = {
  name: "Mohammad Anas",
  title: "Java Backend Developer",
  location: "Hyderabad, India",
  email: "mohdanas406261@gmail.com",
  githubUsername: "M-Anas86",
  githubUrl: "https://github.com/M-Anas86",
  linkedinUrl: "https://www.linkedin.com/in/mohd-anas-276929332/",
  resumeUrl: "/resume.pdf",
  // ...
};
```

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Lint / Type Checking
```bash
npm run lint
```

---

## 🌐 Deploy to Vercel

This repository is structured for one-click deployment to Vercel without requiring any backend, database, or server configuration:

1. Push your repository to GitHub (`https://github.com/M-Anas86/...`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically detect **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

The `vercel.json` file handles all client-side SPA routing automatically.
