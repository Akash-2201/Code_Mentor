<div align="center">

# 🛡️ Code Mentor

### AI-Powered Security & Governance IDE

**Find vulnerabilities. Fix them instantly. Understand why they matter.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Gemini](https://img.shields.io/badge/Gemini_2.5_Pro-Vertex_AI-4285F4?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/vertex-ai)
[![Cloud Run](https://img.shields.io/badge/Cloud_Run-Deployed-34A853?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/run)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

</div>

## 🎯 The Vision

**Code Mentor** is an AI-powered governance IDE that helps developers **detect, understand, and fix** security vulnerabilities in real-time — powered by Google's Gemini 2.5 Pro. Instead of just flagging issues, it explains *why* they're dangerous using analogies, technical deep-dives, and even memes — then patches your code with one click.

---

## ✨ Core Features

### 🔍 AI-Powered Vulnerability Scan
Deep security analysis powered by **Gemini 2.5 Pro** (builder) and **Gemini 2.5 Flash** (reviewer). Detects hardcoded secrets, SQL injection, insecure configurations, and more — with CWE classifications.

### ⚡ Live Fix Engine
One-click automated patching. When a vulnerability is found, Code Mentor generates the **full corrected code** and injects it directly into the Monaco editor. No manual remediation needed.

### 🧠 Triple Explainability
Every finding is explained in **three modes**:
| Mode | Example |
|---|---|
| 🏠 **Analogy** | *"Leaving your house key under the doormat — anyone who finds the mat owns your home."* |
| 🔬 **Technical** | *"Static secrets in source violate least-privilege. Use short-lived tokens from a vault."* |
| 😂 **Meme** | *"POV: You pasted sk-... in Slack and the compliance bot achieved sentience."* |

### 💬 Prompt Lab
A sandboxed chatbot powered by Gemini 2.5 Pro for testing AI guardrails, discussing security policies, and analyzing code snippets — with built-in prompt injection detection.

### 🏢 Enterprise Governance
- **Policy Manager** — Toggle AI guardrails (Block PII, HIPAA compliance, injection guards)
- **Audit Logs** — Timestamped record of every scan, patch, and policy change
- **Alert Center** — Real-time security notifications with severity indicators

### 🌗 Theme Engine
Full light/dark mode toggle with a premium design system. Monaco editor dynamically switches between custom `nexus-dark` and `nexus-light` themes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, React 19) |
| **Styling** | Tailwind CSS 4 + custom design system |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **AI Models** | Gemini 2.5 Pro + Flash via Vertex AI |
| **Auth** | NextAuth.js (Google OAuth) |
| **Deployment** | Google Cloud Run (standalone Docker) |
| **Language** | TypeScript (strict mode) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A Google Cloud project with Vertex AI enabled
- A `google-credentials.json` service account key

### 1. Clone the repo
```bash
git clone https://github.com/Akash-2201/Code_Mentor.git
cd Code_Mentor/ai-governance-ide
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_CLIENT_ID="your-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-oauth-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret"
```

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the Code Mentor landing page.

---
## 🔗 Quick Links

| Resource | Link |
| :--- | :--- |
| 🚀 **Live Production Demo** | [https://code-mentor-18789881165.us-central1.run.app/](https://code-mentor-18789881165.us-central1.run.app/) |
| 💼 **Professional Profile** | [LinkedIn / Akash J.](https://www.linkedin.com/in/akash-j-8305a0372) |
| 🛠️ **Project Lab** | [Explore other builds](https://github.com/Akash-2201) |

---

## 📁 Project Structure

```
ai-governance-ide/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/   # Vertex AI scan endpoint
│   │   │   ├── chat/       # Gemini chatbot endpoint
│   │   │   └── auth/       # NextAuth Google OAuth
│   │   ├── ide/            # Main IDE workspace
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── editor/         # Monaco workspace
│   │   ├── security/       # ReviewerPanel, ExplainabilityCard
│   │   ├── chat/           # Prompt Lab
│   │   ├── workspace/      # Dashboard, Sidebar, Navbar
│   │   ├── views/          # Policies, Audit Logs, Alerts
│   │   └── landing/        # Landing page sections
│   └── lib/
│       ├── workspace-data.ts   # Demo files + vulnerability data
│       └── guardrail-detector.ts
├── Dockerfile              # Multi-stage build for Cloud Run
├── next.config.ts          # Standalone output config
└── google-credentials.json # ⚠️ NOT committed (in .gitignore)
```

---

## ☁️ Deployment

Code Mentor deploys to **Google Cloud Run** with a single command:

```bash
gcloud run deploy code-mentor --source . --region us-central1
```

See [deploy-instructions.md](deploy-instructions.md) for the full guide.

---

## 🔒 Security

- **Credentials** are never committed — `.gitignore` blocks `.env`, `google-credentials.json`, and all key files
- **Client-side guardrails** detect prompt injection, API key leaks, and jailbreak attempts before they reach the model
- **Safe patching** — all fixes are applied in-memory in the editor, never auto-written to disk
- **Non-root container** — production Docker runs as a dedicated `nextjs` user

---

## 👨‍💻 Author

**Akash J.** — [GitHub](https://github.com/Akash-2201)

---

<div align="center">

Built with ❤️ and Gemini 2.5 Pro

**Code Mentor** — *Your AI Security Partner*

</div>
