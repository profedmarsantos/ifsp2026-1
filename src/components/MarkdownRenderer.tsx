"use client";

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownCodeBlock from './MarkdownCodeBlock';

// Definindo uma interface local para as props do componente de código
interface CustomCodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  node?: any; // Adicionando a propriedade 'node'
}

interface MarkdownRendererProps {
  markdownPath: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownPath }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(markdownPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        console.error("Error fetching markdown:", err);
        setError("Failed to load content. Please try again later.");
      }
    };

    fetchMarkdown();
  }, [markdownPath]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!markdown) {
    return <div className="p-4 text-gray-500">Loading content...</div>;
  }

  return (
    <div className="markdown-container prose prose-base p-8 bg-card shadow-lg rounded-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: CustomCodeProps) {
            return (
              <MarkdownCodeBlock inline={inline} className={className} {...props}>
                {children}
              </MarkdownCodeBlock>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;