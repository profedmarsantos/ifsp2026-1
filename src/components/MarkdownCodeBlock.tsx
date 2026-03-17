import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Importe o plugin de numeração de linhas
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Importe os componentes de linguagem do Prism que você espera usar.
// Adicione mais conforme necessário para outras linguagens.
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // Para HTML/XML
import 'prismjs/components/prism-bash'; // Para scripts de shell
import 'prismjs/components/prism-json'; // Para JSON
import 'prismjs/components/prism-python'; // Exemplo: para Python
import 'prismjs/components/prism-java'; // Exemplo: para Java
import 'prismjs/components/prism-c'; // Adicionado: Para a linguagem C
import '../../src/lib/prism/register-portugol'; // Garante que Portugol seja registrado

interface MarkdownCodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const MarkdownCodeBlock = ({ inline, className, children }: MarkdownCodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'plaintext';

  // Determine if it's a block code snippet.
  // A block code snippet will have `inline` as false AND a specific language className (e.g., language-c, language-portugol).
  // Inline code will have `inline` as true, or `className` as `language-text`, or no specific language class.
  const isBlockCodeSnippet = inline === false && className && className !== 'language-text' && className.startsWith('language-');

  useEffect(() => {
    // Only apply Prism highlighting and line numbers to block code.
    if (codeRef.current && isBlockCodeSnippet) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, lang, isBlockCodeSnippet]);

  if (!isBlockCodeSnippet) {
    // If it's NOT a block code snippet, treat it as inline.
    return (
      <code className={className}>
        {children}
      </code>
    );
  }

  // If it IS a block code snippet, use <pre> with line numbers.
  const preClasses = `line-numbers ${className || ''} p-4 rounded-md my-4 overflow-auto`;

  return (
    <pre className={preClasses}>
      <code ref={codeRef} className={`language-${lang}`}>
        {children}
      </code>
    </pre>
  );
};

export default MarkdownCodeBlock;