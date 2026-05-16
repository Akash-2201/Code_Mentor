# NEXUS — AI Governance IDE

A modern AI governance IDE built with **Next.js**, **Tailwind CSS v4**, and **shadcn/ui**-style components. Features a dark cyberpunk glassmorphism theme and a fully responsive layout.

## Features

- **Policy editor** — YAML governance policy view with syntax highlighting
- **Live violations panel** — real-time governance alerts by severity
- **Audit stream** — chronological governance event log
- **Metrics dashboard** — policy coverage, risk score, drift, audit readiness
- **IDE console** — governance scanner output tabs
- **Responsive layout** — collapsible mobile nav, adaptive grid panels

## Getting started

```bash
cd ai-governance-ide
npm install
npm run dev
```

- **Landing page** — [http://localhost:3000](http://localhost:3000)
- **Security workspace (IDE)** — [http://localhost:3000/ide](http://localhost:3000/ide)

### Workspace features

- **VS Code + Datadog layout** — collapsible sidebar, top navbar, resizable three-panel workspace
- **Monaco Editor** — file tabs, `nexus-dark` theme, YAML/TS syntax highlighting
- **Prompt Lab** — ChatGPT-style chat with simulated streaming and typing indicator
- **Guardrail warnings** — detects secrets, prompt injection, and unsafe instructions
- **AI Reviewer panel** — vulnerabilities, severity, remediation, patch suggestions
- **Explainability cards** — analogy, meme, and developer technical views

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Radix UI primitives (shadcn/ui pattern)
- Lucide icons
- Monaco Editor (`@monaco-editor/react`)
- `react-resizable-panels` for panel resizing

## Project structure

```
src/
  app/           # Layout, globals, page
  components/
    ide/         # IDE shell, panels, navigation
    ui/          # shadcn-style primitives
  lib/           # utils, mock data
```
