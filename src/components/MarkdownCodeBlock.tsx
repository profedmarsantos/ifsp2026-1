import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Importe o tema padrão claro do Prism e o plugin de numeração de linhas
import 'prismjs/themes/prism.css';
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

  // Heurística: Se ReactMarkdown passa className="language-text", é provável que seja código inline.
  // Isso tenta corrigir a propriedade `inline` do ReactMarkdown se ela estiver se comportando mal.
  const isActuallyInline = inline || (className === 'language-text');

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, lang]);

  if (isActuallyInline) {
    // Para código inline, retorna apenas a tag <code> sem numeração de linha ou <pre>
    return (
      <code className={className}>
        {children}
      </code>
    );
  }

  // Para blocos de código, usa <pre> com numeração de linha
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