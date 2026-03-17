import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      onClick={handlePrint}
      className="print-hidden bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg px-3 py-1.5 flex items-center gap-2"
    >
      <Printer className="h-4 w-4" />
      Imprimir PDF
    </Button>
  );
};

export default PrintButton;