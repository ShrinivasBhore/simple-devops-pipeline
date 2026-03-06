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
    { id: 'intro', label: 'Introduction', icon: Info },
    { id: 'problem', label: 'Problem Statement', icon: AlertCircle },
    { id: 'overview', label: 'Project Overview', icon: Layout },
    { id: 'tools', label: 'Tools Used', icon: Zap },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'structure', label: 'Folder Structure', icon: FolderTree },
    { id: 'webapp', label: 'Web App Code', icon: FileCode },
    { id: 'docker', label: 'Docker Config', icon: Container },
    { id: 'cicd', label: 'CI/CD Pipeline', icon: Workflow },
    { id: 'execution', label: 'Execution Steps', icon: Terminal },
    { id: 'output', label: 'Expected Output', icon: CheckCircle2 },
    { id: 'advantages', label: 'Advantages', icon: Activity },
    { id: 'future', label: 'Future Scope', icon: ShieldCheck },
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

          {/* 1. Introduction to DevOps */}
          <Section id="intro" title="1. Introduction to DevOps" icon={Info}>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                <strong>DevOps</strong> is a combination of cultural philosophies, practices, and tools that increases an organization's ability to deliver applications and services at high velocity. It bridges the gap between <strong>Development (Dev)</strong> and <strong>Operations (Ops)</strong> teams.
              </p>
              
              <h3 className="text-lg font-bold text-slate-800 mb-3">Key DevOps Principles:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-indigo-600 mb-1">Automation</h4>
                  <p className="text-sm text-slate-600">Automating repetitive tasks like building, testing, and deployment to reduce human error.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-indigo-600 mb-1">Continuous Integration (CI)</h4>
                  <p className="text-sm text-slate-600">Regularly merging code changes into a central repository where automated builds and tests are run.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-indigo-600 mb-1">Continuous Delivery (CD)</h4>
                  <p className="text-sm text-slate-600">Ensuring the code is always in a deployable state and can be released to production at any time.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-indigo-600 mb-1">Monitoring</h4>
                  <p className="text-sm text-slate-600">Tracking the performance and health of applications in real-time to identify issues quickly.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 2. Problem Statement */}
          <Section id="problem" title="2. Problem Statement" icon={AlertCircle}>
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                In traditional software development, the process of moving code from a developer's machine to a live server is often manual and fragmented. This leads to several critical issues:
              </p>
              <ul className="space-y-3">
                {[
                  { title: "Manual Deployment Errors", desc: "Humans often make mistakes during configuration or file transfers." },
                  { title: "Slow Release Cycles", desc: "Manual testing and deployment take days or weeks, slowing down business growth." },
                  { title: "Inconsistent Environments", desc: "The 'It works on my machine' problem where code fails in production due to environment differences." },
                  { title: "Lack of Collaboration", desc: "Developers and Operations teams working in silos, leading to miscommunication." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1 text-red-500"><AlertCircle size={18} /></div>
                    <div>
                      <span className="font-bold text-slate-800">{item.title}:</span>
                      <span className="text-slate-600 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-medium">
                <strong>Solution:</strong> Implementing a CI/CD pipeline automates these steps, ensuring every code change is built, tested, and containerized consistently.
              </div>
            </div>
          </Section>

          {/* 3. Project Overview */}
          <Section id="overview" title="3. Project Overview" icon={Layout}>
            <p className="text-slate-600 leading-relaxed mb-6">
              This project demonstrates a <strong>fully automated pipeline</strong> for a simple web application. The workflow is triggered automatically whenever a developer pushes code to the GitHub repository.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-600 mb-4">
                  <Code2 size={24} />
                </div>
                <h4 className="font-bold mb-2">1. Code Commit</h4>
                <p className="text-xs text-slate-500">Developer pushes code to GitHub.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-600 mb-4">
                  <Workflow size={24} />
                </div>
                <h4 className="font-bold mb-2">2. Automated Pipeline</h4>
                <p className="text-xs text-slate-500">GitHub Actions triggers the build process.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-600 mb-4">
                  <Container size={24} />
                </div>
                <h4 className="font-bold mb-2">3. Containerization</h4>
                <p className="text-xs text-slate-500">Docker builds an image and prepares for deployment.</p>
              </div>
            </div>
          </Section>

          {/* 4. Tools and Technologies Used */}
          <Section id="tools" title="4. Tools and Technologies Used" icon={Zap}>
            <div className="space-y-4">
              {[
                { name: "Git & GitHub", icon: Github, role: "Version Control System (VCS) to track code changes and host the repository." },
                { name: "Docker", icon: Container, role: "Containerization tool to package the app and its dependencies into a single image." },
                { name: "GitHub Actions", icon: Workflow, role: "CI/CD automation platform to run workflows based on repository events." },
                { name: "HTML/CSS/JS", icon: Code2, role: "Frontend technologies used to build the simple web application." },
                { name: "Nginx", icon: Server, role: "Web server used inside the Docker container to serve static files." }
              ].map((tool, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors">
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

          {/* 5. System Architecture */}
          <Section id="architecture" title="5. System Architecture" icon={Layers}>
            <p className="text-slate-600 mb-8">
              The following diagram illustrates the end-to-end flow of the automated DevOps pipeline:
            </p>
            <ArchitectureDiagram />
            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-800">Push:</span> Developer writes code and pushes it to the GitHub repository.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-800">Trigger:</span> GitHub detects the push and triggers the defined 'GitHub Actions' workflow.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-800">Build:</span> The runner machine installs Docker and builds a container image using the Dockerfile.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-800">Test & Deploy:</span> The image is tested and then deployed to the target server or cloud platform.</p>
              </div>
            </div>
          </Section>

          {/* 6. Project Folder Structure */}
          <Section id="structure" title="6. Project Folder Structure" icon={FolderTree}>
            <p className="text-slate-600 mb-6">A clean and organized folder structure is essential for any DevOps project:</p>
            <CodeBlock 
              language="text"
              code={`devops-mini-project/
├── index.html          # Main web page
├── style.css           # Styling for the web page
├── script.js           # Interactive logic
├── Dockerfile          # Instructions for Docker image
├── README.md           # Project documentation
└── .github/
    └── workflows/
        └── ci-cd.yml   # GitHub Actions pipeline configuration`}
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="font-bold text-slate-800">index.html:</span> The entry point of our application.
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-800">Dockerfile:</span> Defines the environment for our app.
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-800">.github/workflows:</span> Stores our automation scripts.
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-800">ci-cd.yml:</span> The heart of our automation pipeline.
              </div>
            </div>
          </Section>

          {/* 7. Web Application Development */}
          <Section id="webapp" title="7. Web Application Development" icon={FileCode}>
            <p className="text-slate-600 mb-6">We will create a simple "DevOps Status Dashboard" as our web application.</p>
            
            <CodeBlock 
              filename="index.html"
              language="html"
              code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DevOps Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>DevOps Pipeline Status</h1>
        <div id="status-card" class="card">
            <p>Application is running inside a <strong>Docker Container</strong>!</p>
            <p>Deployed via <strong>GitHub Actions</strong>.</p>
            <div class="status-badge">Live</div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`}
            />

            <CodeBlock 
              filename="style.css"
              language="css"
              code={`body { font-family: sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; }
.container { text-align: center; }
.card { background: white; padding: 2rem; border-radius: 1rem; shadow: 0 4px 6px rgba(0,0,0,0.1); }
.status-badge { background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 2rem; display: inline-block; margin-top: 1rem; font-weight: bold; }`}
            />
          </Section>

          {/* 8. Docker Implementation */}
          <Section id="docker" title="8. Docker Implementation" icon={Container}>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 mb-6">
                <strong>Docker</strong> allows us to package our application with everything it needs (libraries, dependencies, server) into a single "image". This ensures the app runs exactly the same way on every machine.
              </p>
              
              <CodeBlock 
                filename="Dockerfile"
                language="dockerfile"
                code={`# Step 1: Use a lightweight web server as the base image
FROM nginx:alpine

# Step 2: Copy our web application files to the server's directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Step 3: Expose port 80 to allow traffic
EXPOSE 80

# Step 4: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]`}
              />

              <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">Explanation of Dockerfile:</h3>
              <ul className="space-y-4">
                <li className="text-sm text-slate-600">
                  <code className="bg-slate-100 px-2 py-1 rounded text-indigo-600 font-bold">FROM nginx:alpine</code>: We use Nginx (a popular web server) as our base. 'Alpine' is a very small, secure version of Linux.
                </li>
                <li className="text-sm text-slate-600">
                  <code className="bg-slate-100 px-2 py-1 rounded text-indigo-600 font-bold">COPY ...</code>: This command moves our local files into the container's internal file system.
                </li>
                <li className="text-sm text-slate-600">
                  <code className="bg-slate-100 px-2 py-1 rounded text-indigo-600 font-bold">EXPOSE 80</code>: Tells Docker that the container will listen on port 80 (standard HTTP port).
                </li>
              </ul>
            </div>
          </Section>

          {/* 9. CI/CD Pipeline Implementation */}
          <Section id="cicd" title="9. CI/CD Pipeline Implementation" icon={Workflow}>
            <p className="text-slate-600 mb-6">
              The <strong>CI/CD pipeline</strong> is defined in a YAML file. It tells GitHub Actions what to do when code is pushed.
            </p>

            <CodeBlock 
              filename=".github/workflows/ci-cd.yml"
              language="yaml"
              code={`name: CI/CD Pipeline

on:
  push:
    branches: [ "main" ] # Trigger on push to main branch

jobs:
  build:
    runs-on: ubuntu-latest # Use a Linux runner

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3 # Get code from repo

    - name: Build Docker Image
      run: docker build -t my-web-app:latest .

    - name: Run Tests
      run: echo "Running automated tests..." # Placeholder for actual tests

    - name: Verify Build
      run: docker images # List images to confirm build success`}
            />

            <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Info size={18} /> How it works:
              </h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                When you push code, GitHub starts a virtual machine (Ubuntu). It downloads your code, installs Docker, builds your image, and runs any tests you've defined. If any step fails, the pipeline stops and notifies you.
              </p>
            </div>
          </Section>

          {/* 10. Step-by-Step Execution */}
          <Section id="execution" title="10. Step-by-Step Execution" icon={Terminal}>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 mb-2">Step 1: Setup Environment</h4>
                <p className="text-sm text-slate-600">Install <strong>Git</strong> and <strong>Docker Desktop</strong> on your local machine.</p>
              </div>

              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 mb-2">Step 2: Create GitHub Repository</h4>
                <p className="text-sm text-slate-600">Go to GitHub and create a new repository named <code className="bg-slate-100 px-1 rounded">devops-mini-project</code>.</p>
              </div>

              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 mb-2">Step 3: Add Files Locally</h4>
                <p className="text-sm text-slate-600">Create the files (index.html, Dockerfile, etc.) in a folder on your computer.</p>
              </div>

              <div className="relative pl-8 border-l-2 border-slate-200">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 mb-2">Step 4: Push to GitHub</h4>
                <CodeBlock 
                  language="bash"
                  code={`git init
git add .
git commit -m "Initial DevOps setup"
git remote add origin <your-repo-url>
git push -u origin main`}
                />
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900 mb-2">Step 5: Monitor Actions</h4>
                <p className="text-sm text-slate-600">Go to the <strong>"Actions"</strong> tab in your GitHub repository to see the pipeline running in real-time.</p>
              </div>
            </div>
          </Section>

          {/* 11. Expected Output & Live Simulator */}
          <Section id="output" title="11. Expected Output & Live Simulator" icon={CheckCircle2}>
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

              <div className="p-6 bg-slate-900 rounded-2xl text-emerald-400 font-mono text-sm hidden md:block">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} />
                  <span>Run actions/checkout@v3</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} />
                  <span>Run docker build -t my-web-app:latest .</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} />
                  <span>Successfully built 7d8e9f0a1b2c</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Job Completed Successfully!</span>
                </div>
              </div>
              <p className="text-slate-600">
                Once the pipeline finishes, you will see a green checkmark next to your commit. This confirms that your code is valid, the Docker image was built correctly, and the application is ready for deployment.
              </p>
            </div>
          </Section>

          {/* 12. Advantages of DevOps in This Project */}
          <Section id="advantages" title="12. Advantages of DevOps" icon={Activity}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-indigo-600"><Zap size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Speed</h4>
                  <p className="text-sm text-slate-600">Code changes are live in minutes instead of hours.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-indigo-600"><ShieldCheck size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Reliability</h4>
                  <p className="text-sm text-slate-600">Automated tests catch bugs before they reach users.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-indigo-600"><Layers size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Consistency</h4>
                  <p className="text-sm text-slate-600">Docker ensures the app runs the same everywhere.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-indigo-600"><Activity size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Efficiency</h4>
                  <p className="text-sm text-slate-600">Developers focus on code, not manual server tasks.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 13. Future Improvements */}
          <Section id="future" title="13. Future Improvements" icon={ShieldCheck}>
            <p className="text-slate-600 mb-6">This project can be expanded with more advanced DevOps tools:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-indigo-600"><ChevronRight size={18} /></div>
                <div>
                  <span className="font-bold">Kubernetes (K8s):</span> For orchestrating multiple containers and auto-scaling.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-indigo-600"><ChevronRight size={18} /></div>
                <div>
                  <span className="font-bold">Monitoring (Prometheus & Grafana):</span> To visualize server health and traffic.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-indigo-600"><ChevronRight size={18} /></div>
                <div>
                  <span className="font-bold">Cloud Deployment:</span> Automatically pushing the Docker image to AWS (ECR/ECS) or Azure.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-indigo-600"><ChevronRight size={18} /></div>
                <div>
                  <span className="font-bold">Security Scanning:</span> Adding tools like 'SonarQube' to check for vulnerabilities in code.
                </div>
              </li>
            </ul>
          </Section>

          {/* 14. Conclusion */}
          <Section id="conclusion" title="14. Conclusion" icon={CheckCircle2}>
            <div className="bg-indigo-600 rounded-2xl p-8 text-white">
              <p className="text-lg leading-relaxed mb-6">
                In conclusion, this project demonstrates how <strong>DevOps automation</strong> transforms the software development lifecycle. By integrating <strong>GitHub Actions</strong> and <strong>Docker</strong>, we have created a system that is fast, reliable, and scalable.
              </p>
              <p className="text-indigo-100 italic">
                "DevOps is not just about tools; it's about a culture of continuous improvement and automation that empowers teams to deliver high-quality software at the speed of business."
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
