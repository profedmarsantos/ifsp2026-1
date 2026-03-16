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
      className="print-hidden bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-lg px-4 py-2 flex items-center gap-2"
    >
      <Printer className="h-4 w-4" />
      Imprimir PDF
    </Button>
  );
};

export default PrintButton;