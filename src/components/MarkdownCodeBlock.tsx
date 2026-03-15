import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Importe o plugin de numeração de linhas (sempre ativo)
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Importe os componentes de linguagem do Prism que você espera usar.
// Adicione mais conforme necessário para outras linguagens.
import 'prismjs/components/prism-python'; // Para Python
import 'prismjs/components/prism-c'; // Para a linguagem C

interface MarkdownCodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const MarkdownCodeBlock = ({ inline, className, children }: MarkdownCodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'plaintext';

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, lang]);

  if (inline) {
    return <code className={className}>{children}</code>;
  }

  const preClasses = `line-numbers ${className} p-4 rounded-md my-4 overflow-auto`;

  return (
    <pre className={preClasses}>
      <code ref={codeRef} className={`language-${lang}`}>
        {children}
      </code>
    </pre>
  );
};

export default MarkdownCodeBlock;