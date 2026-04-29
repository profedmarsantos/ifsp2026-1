import React, { useEffect, useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import PrintButton from "@/components/PrintButton";
import FontSizeControls from "@/components/FontSizeControls";
import { Link, useSearchParams } from "react-router-dom";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface MarkdownMenuItem {
  id: string;
  title: string;
  content: string;
  order: number;
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
    const orderMatch = baseName.match(/^(\d+)\./);
    const order = orderMatch ? Number.parseInt(orderMatch[1], 10) : Number.MAX_SAFE_INTEGER;
    const title = baseName.replace(/^\d+\.\s*/, '');

    return {
      id: fileName,
      title,
      content,
      order,
    };
  })
  .sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title, 'pt-BR', { numeric: true, sensitivity: 'base' });
  });

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [baseFontSize, setBaseFontSize] = useState(16); // Tamanho da fonte padrão em pixels
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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
    <div className={`bg-background min-h-screen lg:h-screen lg:grid ${isSidebarCollapsed ? 'lg:grid-cols-[1fr]' : 'lg:grid-cols-[20rem_minmax(0,1fr)]'} lg:overflow-hidden`}>
      {!isSidebarCollapsed && (
        <aside className="hidden lg:block h-screen bg-white border-r border-zinc-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-900">Conteudos</h2>
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(true)}
              className="rounded-md border border-zinc-300 bg-zinc-100 px-2 py-1 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-200"
              aria-label="Encolher sidebar"
              title="Encolher sidebar"
            >
              {'<<'}
            </button>
          </div>

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
      )}

      <main className="w-full lg:h-screen lg:overflow-y-auto">
        <div className="w-full px-4 pb-8 pt-24 lg:px-8 lg:pb-8 lg:pt-8">
          {isSidebarCollapsed && (
            <div className="hidden lg:flex mb-4">
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(false)}
                className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-100"
                aria-label="Expandir sidebar"
                title="Expandir sidebar"
              >
                {'>>'}
              </button>
            </div>
          )}

          <div className="sticky top-4 z-40 mb-4">
            <div className="w-full flex justify-end pr-0 lg:pr-2">
              <div className="flex flex-col gap-[7px] items-end rounded-md bg-background/70 p-1 backdrop-blur-sm"> {/* Controles sticky ancorados na extrema direita da area de trabalho */}
                <PrintButton />
                <div className="w-full flex justify-center"> {/* Wrapper para centralizar os controles de fonte */}
                  <FontSizeControls onIncrease={increaseFontSize} onDecrease={decreaseFontSize} />
                </div>
              </div>
            </div>
          </div>

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

          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl">
            {selectedMarkdown ? (
              <MarkdownRenderer markdownContent={selectedMarkdown.content} baseFontSize={baseFontSize} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-zinc-700">
                Nenhum arquivo markdown encontrado em src/content.
              </div>
            )}
            </div>
          </div>
        </div>
      </main>

      <MadeWithDyad />
    </div>
  );
};

export default Index;