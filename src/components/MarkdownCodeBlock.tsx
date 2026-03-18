import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Prism from 'prismjs';
import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/utils/toast';

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
  const [copied, setCopied] = useState(false);
  
  // Extrai a linguagem do className, padrão para 'plaintext' se não encontrado
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'plaintext';
  const codeContent = React.Children.toArray(children)
    .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
    .join('');
  const isBlockCode = !inline;
  const canCopyCode = isBlockCode && (lang === 'c' || lang === 'portugol');

  // Determina se é um bloco de código que deve ser destacado e ter numeração de linhas
  // Não deve ser inline, deve ter uma classe de linguagem, e a linguagem não deve ser 'text' (para blocos de texto simples)
  const shouldHighlight = isBlockCode && className && className.startsWith('language-') && lang !== 'text';

  useEffect(() => {
    if (codeRef.current && shouldHighlight) {
      // Aplica o highlight do Prism
      Prism.highlightElement(codeRef.current);
    }
  }, [children, lang, shouldHighlight]); // Re-executa o efeito se o conteúdo, a linguagem ou o status de highlight mudar

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 2000);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      showError('A area de transferencia nao esta disponivel neste navegador.');
      return;
    }

    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      showSuccess('Codigo copiado para a area de transferencia.');
    } catch (error) {
      console.error('Error copying code block:', error);
      showError('Nao foi possivel copiar o codigo.');
    }
  };

  if (!isBlockCode) {
    // Renderiza como código inline
    return (
      <code className={className}>
        {children}
      </code>
    );
  }

  // Renderiza como um bloco destacado com numeração de linhas
  // A classe 'line-numbers' é crucial para o plugin
  // Adicionando classes Tailwind explícitas para fundo e borda para diagnóstico
  if (!shouldHighlight) {
    return (
      <code className={className}>
        {children}
      </code>
    );
  }

  const defaultPreClasses = `line-numbers ${className || ''} p-4 rounded-lg my-4 overflow-auto bg-[#f2f1ed] border border-[#dddddd]`;

  if (!canCopyCode) {
    return (
      <pre className={defaultPreClasses}>
        <code ref={codeRef} className={`language-${lang}`}>
          {children}
        </code>
      </pre>
    );
  }

  const preClasses = `line-numbers ${className || ''} rounded-lg overflow-auto bg-[#f2f1ed] border border-[#dddddd] pt-12 pr-4 pb-4 pl-4`;

  return (
    <div className="relative my-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 h-8 gap-1.5 border-zinc-300 bg-white/90 px-2 text-zinc-700 shadow-sm backdrop-blur hover:bg-white"
        aria-label={copied ? 'Codigo copiado' : 'Copiar codigo'}
        title={copied ? 'Codigo copiado' : 'Copiar codigo'}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span>{copied ? 'Copiado' : 'Copiar'}</span>
      </Button>

      <pre className={preClasses}>
        <code ref={codeRef} className={`language-${lang}`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default MarkdownCodeBlock;