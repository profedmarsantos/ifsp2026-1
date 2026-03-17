import React, { useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PrintButton from "@/components/PrintButton";
import FontSizeControls from "@/components/FontSizeControls"; // Importa o novo componente

const Index = () => {
  const [baseFontSize, setBaseFontSize] = useState(16); // Tamanho da fonte padrão em pixels

  const increaseFontSize = () => {
    setBaseFontSize((prevSize) => Math.min(prevSize + 2, 24)); // Tamanho máximo da fonte 24px
  };

  const decreaseFontSize = () => {
    setBaseFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Tamanho mínimo da fonte 12px
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8 relative">
      <div className="fixed top-8 right-8 flex flex-col gap-4 z-50"> {/* Contêiner fixo para os botões */}
        <PrintButton />
        <FontSizeControls onIncrease={increaseFontSize} onDecrease={decreaseFontSize} />
      </div>
      <div className="max-w-4xl w-full mt-16">
        <MarkdownRenderer markdownPath="/src/content/Operadores logicos e aritmeticos.md" baseFontSize={baseFontSize} />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;