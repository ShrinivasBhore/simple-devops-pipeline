import React, { useState } from 'react';
import { CheckCircle2, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
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
