import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
}

const FontSizeControls = ({ onIncrease, onDecrease }: FontSizeControlsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={onIncrease}
        className="bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg px-4 py-2 flex items-center justify-center w-12 h-12"
        aria-label="Aumentar fonte"
      >
        <Plus className="h-5 w-5" />
      </Button>
      <Button
        onClick={onDecrease}
        className="bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg px-4 py-2 flex items-center justify-center w-12 h-12"
        aria-label="Diminuir fonte"
      >
        <Minus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FontSizeControls;