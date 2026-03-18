import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownCodeBlock from './MarkdownCodeBlock';

interface MarkdownRendererProps {
  markdownPath?: string;
  markdownContent?: string;
  baseFontSize: number; // Nova prop para o tamanho da fonte base
}

const MarkdownRenderer = ({ markdownPath, markdownContent, baseFontSize }: MarkdownRendererProps) => {
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof markdownContent === 'string') {
      setMarkdown(markdownContent);
      setError(null);
      return;
    }

    if (!markdownPath) {
      setError('No markdown source provided.');
      setMarkdown('');
      return;
    }

    fetch(markdownPath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch markdown: ${res.statusText}`);
        }
        return res.text();
      })
      .then((text) => setMarkdown(text))
      .catch((err) => {
        console.error("Error fetching markdown:", err);
        setError("Failed to load markdown content.");
      });
  }, [markdownPath, markdownContent]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div 
      className="markdown-container p-8 bg-white rounded-lg shadow-lg"
      style={{ fontSize: `${baseFontSize}px` }} // Aplica o tamanho da fonte base aqui
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: MarkdownCodeBlock,
          h1: ({ node, ...props }) => <h1 style={{ fontSize: '2.25em', fontWeight: 'bold', marginBottom: '1em' }} className="text-zinc-900" {...props} />,
          h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.75em', fontWeight: 'semibold', marginBottom: '0.75em', marginTop: '1.5em' }} className="text-zinc-800" {...props} />,
          h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.25em', fontWeight: 'medium', marginBottom: '0.5em', marginTop: '1.25em' }} className="text-zinc-700" {...props} />,
          p: ({ node, ...props }) => <p style={{ fontSize: '1em', marginBottom: '0.5em', lineHeight: '1.6' }} className="text-zinc-700" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
          ul: ({ node, ...props }) => <ul style={{ marginLeft: '1.5em', marginBottom: '0.5em' }} className="list-disc list-inside" {...props} />,
          ol: ({ node, ...props }) => <ol style={{ marginLeft: '1.5em', marginBottom: '0.5em' }} className="list-decimal list-inside" {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '0.25em', fontSize: '1em' }} className="text-zinc-700" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-zinc-300 pl-4 py-2 italic text-zinc-600 my-4" {...props} />,
          table: ({ node, ...props }) => <table className="w-full border-collapse my-4" {...props} />,
          th: ({ node, ...props }) => <th className="border border-zinc-200 px-4 py-2 text-left bg-zinc-50 font-semibold text-zinc-800" {...props} />,
          td: ({ node, ...props }) => <td className="border border-zinc-200 px-4 py-2 text-zinc-700" {...props} />,
          hr: ({ node, ...props }) => <hr className="my-8 border-zinc-200" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;