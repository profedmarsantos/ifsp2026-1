import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Importe o plugin de numeração de linhas
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Importe os componentes de linguagem do Prism que você espera usar.
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
  
  // Extrai a linguagem do className, padrão para 'plaintext' se não encontrado
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'plaintext';

  // Determina se é um bloco de código que deve ser destacado e ter numeração de linhas
  // Não deve ser inline, deve ter uma classe de linguagem, e a linguagem não deve ser 'text' (para blocos de texto simples)
  const shouldHighlight = !inline && className && className.startsWith('language-') && lang !== 'text';

  useEffect(() => {
    if (codeRef.current && shouldHighlight) {
      // Aplica o highlight do Prism
      Prism.highlightElement(codeRef.current);
    }
  }, [children, lang, shouldHighlight]); // Re-executa o efeito se o conteúdo, a linguagem ou o status de highlight mudar

  if (!shouldHighlight) {
    // Renderiza como código simples (inline ou bloco sem highlight como 'language-text')
    return (
      <code className={className}>
        {children}
      </code>
    );
  }

  // Renderiza como um bloco destacado com numeração de linhas
  // A classe 'line-numbers' é crucial para o plugin
  // Adicionando classes Tailwind explícitas para fundo e borda para diagnóstico
  const preClasses = `line-numbers ${className || ''} p-4 rounded-lg my-4 overflow-auto bg-[#f2f1ed] border border-[#dddddd]`;

  return (
    <pre className={preClasses}>
      <code ref={codeRef} className={`language-${lang}`}>
        {children}
      </code>
    </pre>
  );
};

export default MarkdownCodeBlock;