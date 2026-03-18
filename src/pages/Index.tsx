import React, { useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PrintButton from "@/components/PrintButton";
import FontSizeControls from "@/components/FontSizeControls";
import defaultMarkdownContent from "@/content/Operadores logicos e aritmeticos.md?raw";

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
      <div className="fixed top-8 right-8 flex flex-col gap-[7px] z-50 items-end"> {/* Contêiner fixo para os botões, alinhado à direita, com gap de 7px */}
        <PrintButton />
        <div className="w-full flex justify-center"> {/* Wrapper para centralizar os controles de fonte */}
          <FontSizeControls onIncrease={increaseFontSize} onDecrease={decreaseFontSize} />
        </div>
      </div>
      <div className="max-w-4xl w-full mt-16">
        <MarkdownRenderer markdownContent={defaultMarkdownContent} baseFontSize={baseFontSize} />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;