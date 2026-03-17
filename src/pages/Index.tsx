import { MadeWithDyad } from "@/components/made-with-dyad";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PrintButton from "@/components/PrintButton"; // Importar o novo componente

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8 relative"> {/* Adicionado 'relative' para posicionamento absoluto */}
      <div className="absolute top-8 right-8 z-10"> {/* Posiciona o botão no canto superior direito */}
        <PrintButton />
      </div>
      <div className="max-w-4xl w-full mt-16"> {/* Adicionado 'mt-16' para dar espaço ao botão */}
        <MarkdownRenderer markdownPath="/README.md" /> {/* Alterado o caminho para README.md */}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;