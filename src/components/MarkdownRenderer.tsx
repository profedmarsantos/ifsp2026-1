import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownCodeBlock from './MarkdownCodeBlock';

interface MarkdownRendererProps {
  markdownPath: string;
}

const MarkdownRenderer = ({ markdownPath }: MarkdownRendererProps) => {
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [markdownPath]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="markdown-container p-8 bg-white rounded-lg shadow-lg"> {/* Alterado shadow-sm para shadow-lg */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: MarkdownCodeBlock,
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-zinc-900 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-zinc-800 mb-3 mt-6" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-zinc-700 mb-2 mt-5" {...props} />,
          p: ({ node, ...props }) => <p className="text-base text-zinc-700 mb-2 leading-relaxed" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-4 mb-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-4 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1 text-zinc-700" {...props} />,
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