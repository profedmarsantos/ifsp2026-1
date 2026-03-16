import { MadeWithDyad } from "@/components/made-with-dyad";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8">
      <div className="max-w-4xl w-full">
        <MarkdownRenderer markdownPath="/src/content/teste.md" />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;