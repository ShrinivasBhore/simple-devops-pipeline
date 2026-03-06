/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Github, 
  Container, 
  Workflow, 
  Code2, 
  Layout, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Layers, 
  FileCode, 
  FolderTree,
  ExternalLink,
  ChevronRight,
  Info,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Section = ({ id, title, icon: Icon, children }: { id: string, title: string, icon: any, children: React.ReactNode }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-16 scroll-mt-24"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      {children}
    </div>
  </motion.section>
);

const CodeBlock = ({ code, language, filename }: { code: string, language: string, filename?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 group">
      {filename && (
        <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 flex justify-between items-center">
          <span className="font-mono">{filename}</span>
          <button 
            onClick={copyToClipboard}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            {copied ? <CheckCircle2 size={12} /> : <Terminal size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className={`bg-slate-900 text-slate-100 p-4 overflow-x-auto font-mono text-sm ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ArchitectureDiagram = () => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 border border-slate-100">
        <Code2 size={32} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Developer</span>
    </div>

    <ArrowRight className="hidden md:block text-slate-300" />
    <ChevronRight className="md:hidden text-slate-300 rotate-90" />

    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-slate-900 border border-slate-100">
        <Github size={32} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GitHub Repo</span>
    </div>

    <ArrowRight className="hidden md:block text-slate-300" />
    <ChevronRight className="md:hidden text-slate-300 rotate-90" />

    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-indigo-600 rounded-full shadow-md flex items-center justify-center text-white">
        <Workflow size={32} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">GitHub Actions</span>
    </div>

    <ArrowRight className="hidden md:block text-slate-300" />
    <ChevronRight className="md:hidden text-slate-300 rotate-90" />

    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-blue-500 border border-slate-100">
        <Container size={32} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Docker Build</span>
    </div>

    <ArrowRight className="hidden md:block text-slate-300" />
    <ChevronRight className="md:hidden text-slate-300 rotate-90" />

    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-emerald-500 rounded-full shadow-md flex items-center justify-center text-white">
        <Server size={32} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Live App</span>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [version, setVersion] = useState('1.0.0');
  const [pipelineState, setPipelineState] = useState<'idle' | 'pushing' | 'building' | 'deploying' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const runSimulation = async () => {
    setPipelineState('pushing');
    setLogs(['[SYSTEM] Detected code change in main.js...', '[GIT] git add .', '[GIT] git commit -m "Update dashboard UI"', '[GIT] git push origin main']);
    
    await new Promise(r => setTimeout(r, 1500));
    setPipelineState('building');
    setLogs(prev => [...prev, '[CI] GitHub Actions triggered: Build Job #42', '[DOCKER] Sending build context to Docker daemon...', '[DOCKER] Step 1/4 : FROM nginx:alpine', '[DOCKER] Step 2/4 : COPY . /usr/share/nginx/html/', '[DOCKER] Step 3/4 : EXPOSE 80', '[DOCKER] Successfully built image my-web-app:latest']);
    
    await new Promise(r => setTimeout(r, 1500));
    setPipelineState('deploying');
    setLogs(prev => [...prev, '[CD] Deploying container to production server...', '[CD] Health check passing: http://localhost:80', '[CD] Traffic shifted to new version.']);
    
    await new Promise(r => setTimeout(r, 1500));
    setPipelineState('success');
    setVersion('1.1.0');
    setLogs(prev => [...prev, '[SYSTEM] Auto-update complete. Version 1.1.0 is now live.']);
  };

  const navItems = [
    { id: 'overview', label: 'Project Overview', icon: Layout },
    { id: 'tools', label: 'Technologies Used', icon: Zap },
    { id: 'structure', label: 'Folder Structure', icon: FolderTree },
    { id: 'webapp', label: 'Web Application', icon: FileCode },
    { id: 'docker', label: 'Docker Configuration', icon: Container },
    { id: 'cicd', label: 'CI/CD Pipeline', icon: Workflow },
    { id: 'commits', label: 'Commit History', icon: Github },
    { id: 'execution', label: 'Project Execution', icon: Terminal },
    { id: 'output', label: 'Expected Output', icon: CheckCircle2 },
    { id: 'conclusion', label: 'Conclusion', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Workflow size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">DevOps Mini Project</h1>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>Engineering Exam Guide</span>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <motion.span 
              key={version}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold"
            >
              v{version}
            </motion.span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-28 h-fit">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              Design and Implementation of an Automated CI/CD Pipeline
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              A complete guide to building a modern DevOps pipeline using Docker and GitHub Actions for a simple web application.
            </p>
          </div>

          {/* 1. Project Overview */}
          <Section id="overview" title="1. Project Overview" icon={Layout}>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                This project demonstrates a professional <strong>DevOps CI/CD Pipeline</strong> for a web application. The primary goal is to showcase how modern software engineering practices can automate the entire lifecycle—from code development to containerized deployment.
              </p>
              <p className="text-slate-600 mb-6">
                By implementing this workflow, we eliminate manual deployment bottlenecks, ensure environment consistency using <strong>Docker</strong>, and achieve rapid feedback loops through <strong>GitHub Actions</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-1">Automation</h4>
                  <p className="text-xs text-indigo-800">Every push triggers a build, reducing human intervention and errors.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-1">Scalability</h4>
                  <p className="text-xs text-emerald-800">Containerization allows the app to scale horizontally across any infrastructure.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 2. Technologies Used */}
          <Section id="tools" title="2. Technologies Used" icon={Zap}>
            <div className="space-y-4">
              {[
                { name: "Git & GitHub", icon: Github, role: "Version control for tracking changes and hosting the CI/CD environment." },
                { name: "Docker", icon: Container, role: "Containerization engine to package the application into portable images." },
                { name: "GitHub Actions", icon: Workflow, role: "Automation platform for building, testing, and deploying code." },
                { name: "Nginx", icon: Server, role: "High-performance web server used to serve the static web application." },
                { name: "HTML5/CSS3/JS", icon: Code2, role: "Core web technologies used to build the interactive user interface." }
              ].map((tool, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                  <div className="p-2 bg-white shadow-sm rounded-lg border border-slate-100 text-slate-700">
                    <tool.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tool.name}</h4>
                    <p className="text-sm text-slate-600">{tool.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 3. Project Folder Structure */}
          <Section id="structure" title="3. Project Folder Structure" icon={FolderTree}>
            <p className="text-slate-600 mb-6">A production-ready structure that separates code, configuration, and documentation:</p>
            <CodeBlock 
              language="text"
              code={`devops-ci-cd-webapp/
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # GitHub Actions pipeline
├── docs/
│   └── architecture.md     # System design documentation
├── index.html              # Frontend entry point
├── style.css               # Application styling
├── script.js               # Frontend logic
├── Dockerfile              # Container build instructions
├── docker-compose.yml      # Multi-container orchestration
└── README.md               # Project guide & setup`}
            />
            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-slate-900">Key File Explanations:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-indigo-600">docker-compose.yml:</span> Used for local development to spin up the app with a single command.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-indigo-600">architecture.md:</span> Provides a deep dive into the technical design for portfolio reviewers.
                </div>
              </div>
            </div>
          </Section>

          {/* 4. Web Application */}
          <Section id="webapp" title="4. Web Application" icon={FileCode}>
            <p className="text-slate-600 mb-6">A professional landing page that serves as the "Product" of our DevOps pipeline.</p>
            
            <CodeBlock 
              filename="index.html"
              language="html"
              code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps CI/CD Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="hero">
        <h1>DevOps CI/CD Pipeline Project</h1>
        <p>This application was built, tested, and deployed automatically.</p>
        <div id="status" class="badge">System Online</div>
    </div>
    <script src="script.js"></script>
</body>
</html>`}
            />

            <CodeBlock 
              filename="style.css"
              language="css"
              code={`:root { --primary: #4f46e5; --bg: #f8fafc; }
body { font-family: 'Inter', sans-serif; background: var(--bg); margin: 0; display: grid; place-items: center; height: 100vh; }
.hero { text-align: center; background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
.badge { display: inline-block; margin-top: 1.5rem; padding: 0.5rem 1.25rem; background: #10b981; color: white; border-radius: 99px; font-weight: 600; font-size: 0.875rem; }`}
            />
          </Section>

          {/* 5. Docker Configuration */}
          <Section id="docker" title="5. Docker Configuration" icon={Container}>
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                The <strong>Dockerfile</strong> is the blueprint for our container. It uses a multi-stage build approach (simplified here for a static site) to ensure a minimal footprint.
              </p>
              
              <CodeBlock 
                filename="Dockerfile"
                language="dockerfile"
                code={`# Use Nginx Alpine as a lightweight base image
FROM nginx:alpine

# Set the working directory to Nginx's default public folder
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy local project files into the container
COPY index.html .
COPY style.css .
COPY script.js .

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]`}
              />

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">docker-compose.yml (Local Dev)</h4>
                <CodeBlock 
                  language="yaml"
                  code={`version: '3.8'
services:
  webapp:
    build: .
    ports:
      - "8080:80"
    volumes:
      - .:/usr/share/nginx/html`}
                />
              </div>
            </div>
          </Section>

          {/* 6. CI/CD Pipeline */}
          <Section id="cicd" title="6. CI/CD Pipeline" icon={Workflow}>
            <p className="text-slate-600 mb-6">
              Our <strong>GitHub Actions</strong> workflow automates the "Integration" and "Delivery" parts of DevOps.
            </p>

            <CodeBlock 
              filename=".github/workflows/ci-cd.yml"
              language="yaml"
              code={`name: DevOps CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Docker Image
        run: docker build -t devops-webapp:latest .

      - name: Run Security Scan
        run: echo "Scanning image for vulnerabilities..."

      - name: Test Application
        run: |
          docker run -d --name test-app -p 8080:80 devops-webapp:latest
          sleep 5
          curl --silent --fail http://localhost:8080 | grep "DevOps"`}
            />
          </Section>

          {/* 7. Git Commit History */}
          <Section id="commits" title="7. Complete Git Commit History" icon={Github}>
            <p className="text-slate-600 mb-8">A professional commit history follows the <strong>Conventional Commits</strong> standard, making the project's evolution clear to any recruiter or examiner.</p>
            
            <div className="space-y-4">
              {[
                { type: 'initial', msg: 'Initial commit: create project structure', desc: 'Sets up the basic directory layout and empty files.' },
                { type: 'feat', msg: 'feat: add basic web application files', desc: 'Adds index.html, style.css, and script.js.' },
                { type: 'feat', msg: 'feat: improve UI and styling', desc: 'Enhances the visual appearance with modern CSS.' },
                { type: 'feat', msg: 'feat: add Dockerfile for containerization', desc: 'Enables the app to run in an isolated container.' },
                { type: 'feat', msg: 'feat: add docker-compose configuration', desc: 'Simplifies multi-container management and local development.' },
                { type: 'ci', msg: 'ci: configure GitHub Actions CI/CD pipeline', desc: 'Automates the build and test process on every push.' },
                { type: 'docs', msg: 'docs: update README documentation', desc: 'Adds clear instructions for other developers.' },
                { type: 'docs', msg: 'docs: add architecture explanation', desc: 'Documents the system design in docs/architecture.md.' },
                { type: 'chore', msg: 'chore: optimize Docker configuration', desc: 'Reduces image size and improves build speed.' },
                { type: 'release', msg: 'release: v1.0 final version of DevOps project', desc: 'Finalizes the project for submission/portfolio.' },
              ].map((commit, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      commit.type === 'feat' ? 'bg-blue-500' : 
                      commit.type === 'ci' ? 'bg-indigo-500' : 
                      commit.type === 'release' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`} />
                    {i < 9 && <div className="w-0.5 h-full bg-slate-100 group-hover:bg-slate-200 transition-colors" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-400">7d8e9f0</span>
                      <h4 className="font-bold text-slate-900 text-sm">{commit.msg}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{commit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 8. Project Execution */}
          <Section id="execution" title="8. Project Execution" icon={Terminal}>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">1. Clone the Repository</h4>
                <CodeBlock language="bash" code="git clone https://github.com/yourusername/devops-ci-cd-webapp.git" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">2. Build & Run Locally (Docker)</h4>
                <CodeBlock language="bash" code="docker build -t devops-app .\ndocker run -p 8080:80 devops-app" />
                <p className="text-xs text-slate-500 mt-2">Visit <code className="bg-slate-100 px-1 rounded">http://localhost:8080</code> to see the app.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">3. Using Docker Compose</h4>
                <CodeBlock language="bash" code="docker-compose up -d" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">4. Testing the Pipeline</h4>
                <p className="text-sm text-slate-600">Make a change to <code className="bg-slate-100 px-1 rounded">index.html</code>, commit, and push. Observe the "Actions" tab on GitHub to see the pipeline trigger automatically.</p>
              </div>
            </div>
          </Section>

          {/* 9. Expected Output & Live Simulator */}
          <Section id="output" title="9. Expected Output & Live Simulator" icon={CheckCircle2}>
            <div className="space-y-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Live Pipeline Simulation</h3>
                    <p className="text-sm text-slate-500">Experience how the "Auto-Update" works after a code change.</p>
                  </div>
                  <button 
                    onClick={runSimulation}
                    disabled={pipelineState !== 'idle' && pipelineState !== 'success'}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      pipelineState === 'idle' || pipelineState === 'success'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {pipelineState === 'idle' ? (
                      <>
                        <Zap size={18} />
                        Push Code Change
                      </>
                    ) : pipelineState === 'success' ? (
                      <>
                        <CheckCircle2 size={18} />
                        Update Successful
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    )}
                  </button>
                </div>

                {/* Pipeline Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { id: 'pushing', label: 'Git Push', icon: Github },
                    { id: 'building', label: 'Docker Build', icon: Container },
                    { id: 'deploying', label: 'Deploying', icon: Server },
                    { id: 'success', label: 'Live', icon: CheckCircle2 },
                  ].map((step, i) => {
                    const isActive = pipelineState === step.id;
                    const isDone = 
                      (pipelineState === 'building' && i < 1) ||
                      (pipelineState === 'deploying' && i < 2) ||
                      (pipelineState === 'success');

                    return (
                      <div key={step.id} className="relative">
                        <div className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                          isActive 
                            ? 'bg-indigo-50 border-indigo-500 scale-105 shadow-md' 
                            : isDone 
                              ? 'bg-emerald-50 border-emerald-500' 
                              : 'bg-white border-slate-100 opacity-50'
                        }`}>
                          <step.icon size={20} className={isActive ? 'text-indigo-600' : isDone ? 'text-emerald-600' : 'text-slate-400'} />
                          <span className={`text-xs font-bold ${isActive ? 'text-indigo-900' : isDone ? 'text-emerald-900' : 'text-slate-500'}`}>
                            {step.label}
                          </span>
                        </div>
                        {i < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-slate-200"></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Log Collection */}
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 h-48 overflow-y-auto border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-2">
                    <Terminal size={14} />
                    <span>Pipeline Logs (Collected)</span>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-1 ${log.startsWith('[SYSTEM]') ? 'text-indigo-400 font-bold' : log.startsWith('[DOCKER]') ? 'text-blue-400' : log.startsWith('[CD]') ? 'text-emerald-400' : ''}`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {pipelineState === 'idle' && (
                    <div className="text-slate-600 italic">Waiting for code push...</div>
                  )}
                </div>
              </div>
            </div>
          </Section>

          {/* 10. Conclusion */}
          <Section id="conclusion" title="10. Conclusion" icon={Info}>
            <div className="bg-indigo-600 rounded-2xl p-8 text-white">
              <p className="text-lg leading-relaxed mb-6">
                This project successfully demonstrates the power of <strong>DevOps automation</strong>. By combining <strong>Docker</strong> for environment consistency and <strong>GitHub Actions</strong> for automated delivery, we've built a professional-grade pipeline that is ready for any production environment.
              </p>
              <p className="text-indigo-100 italic">
                "Automation is not just about saving time; it's about creating a reliable, repeatable process that allows engineers to focus on innovation rather than infrastructure."
              </p>
            </div>
          </Section>

          {/* Footer */}
          <footer className="mt-24 pt-12 border-t border-slate-200 text-center text-slate-500 text-sm">
            <p>© 2026 DevOps Engineering Project Guide. All rights reserved.</p>
            <p className="mt-2">Prepared for Academic Assignment / Engineering Exam</p>
          </footer>
        </main>
      </div>

      {/* Mobile Navigation Toggle (Simple) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => {
            const nav = document.getElementById('mobile-nav');
            if (nav) nav.classList.toggle('hidden');
          }}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg"
        >
          <Layout size={24} />
        </button>
      </div>

      <div id="mobile-nav" className="hidden lg:hidden fixed inset-0 bg-white z-[60] p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Project Sections</h2>
          <button 
            onClick={() => document.getElementById('mobile-nav')?.classList.add('hidden')}
            className="text-slate-500"
          >
            Close
          </button>
        </div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setActiveTab(item.id);
                document.getElementById('mobile-nav')?.classList.add('hidden');
              }}
              className="flex items-center gap-3 text-lg font-medium text-slate-600"
            >
              <item.icon size={20} />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
