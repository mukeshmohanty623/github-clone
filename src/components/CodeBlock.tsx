"use client";

import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import "prismjs/themes/prism.css";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current, false);
  }, [children]);

  return (
    <div className="relative group overflow-hidden">
      <div className="absolute top-6 right-4 bg-inherit z-1">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre
        className={cn(`language-${language} ${className} !text-sm`)}
        data-lang={language}
        ref={ref}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
