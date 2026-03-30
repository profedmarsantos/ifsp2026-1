import React, { useEffect, useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PrintButton from "@/components/PrintButton";
import FontSizeControls from "@/components/FontSizeControls";
import { Link, useSearchParams } from "react-router-dom";

interface MarkdownMenuItem {
  id: string;
  title: string;
  content: string;
}

const markdownModules = import.meta.glob("../content/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const markdownItems: MarkdownMenuItem[] = Object.entries(markdownModules)
  .map(([path, content]) => {
    const fileName = path.split('/').pop() || path;
    const baseName = fileName.replace(/\.md$/i, '');
    const title = baseName.replace(/^\d+\.\s*/, '');

    return {
      id: fileName,
      title,
      content,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { numeric: true, sensitivity: 'base' }));

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [baseFontSize, setBaseFontSize] = useState(16); // Tamanho da fonte padrão em pixels
  const selectedDocId = searchParams.get('doc');
  const selectedMarkdown = markdownItems.find((item) => item.id === selectedDocId) || markdownItems[0];

  useEffect(() => {
    if (!selectedDocId && markdownItems[0]) {
      setSearchParams({ doc: markdownItems[0].id }, { replace: true });
    }
  }, [selectedDocId, setSearchParams]);

  const increaseFontSize = () => {
    setBaseFontSize((prevSize) => Math.min(prevSize + 2, 24)); // Tamanho máximo da fonte 24px
  };

  const decreaseFontSize = () => {
    setBaseFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Tamanho mínimo da fonte 12px
  };

  return (
    <div className="min-h-screen bg-background relative pb-8">
      <div className="fixed top-8 right-8 flex flex-col gap-[7px] z-50 items-end"> {/* Contêiner fixo para os botões, alinhado à direita, com gap de 7px */}
        <PrintButton />
        <div className="w-full flex justify-center"> {/* Wrapper para centralizar os controles de fonte */}
          <FontSizeControls onIncrease={increaseFontSize} onDecrease={decreaseFontSize} />
        </div>
      </div>

      <aside className="hidden lg:block fixed left-8 top-8 bottom-8 w-72 bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-zinc-900">Conteudos</h2>
        <nav className="mt-3 flex flex-col gap-2">
          {markdownItems.map((item) => {
            const isActive = selectedMarkdown?.id === item.id;

            return (
              <Link
                key={item.id}
                to={`?doc=${encodeURIComponent(item.id)}`}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'}`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="w-full max-w-4xl mt-24 px-4 lg:mt-8 lg:ml-[22rem] lg:pr-28">
        <aside className="lg:hidden w-full bg-white rounded-lg shadow-lg p-4 h-fit mb-6">
          <h2 className="text-lg font-semibold text-zinc-900">Conteudos</h2>
          <nav className="mt-3 flex flex-col gap-2">
            {markdownItems.map((item) => {
              const isActive = selectedMarkdown?.id === item.id;

              return (
                <Link
                  key={item.id}
                  to={`?doc=${encodeURIComponent(item.id)}`}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>

        {selectedMarkdown ? (
          <MarkdownRenderer markdownContent={selectedMarkdown.content} baseFontSize={baseFontSize} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-zinc-700">
            Nenhum arquivo markdown encontrado em src/content.
          </div>
        )}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;