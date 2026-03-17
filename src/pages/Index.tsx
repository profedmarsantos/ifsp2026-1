import { MadeWithDyad } from "@/components/made-with-dyad";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PrintButton from "@/components/PrintButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8 relative">
      <div className="absolute top-8 right-8 z-10">
        <PrintButton />
      </div>
      <div className="max-w-4xl w-full mt-16">
        {/* Alterado o caminho para o novo arquivo de conteúdo */}
        <MarkdownRenderer markdownPath="/src/content/Operadores logicos e aritmeticos.md" />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;