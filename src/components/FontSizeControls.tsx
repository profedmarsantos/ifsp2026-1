import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
}

const FontSizeControls = ({ onIncrease, onDecrease }: FontSizeControlsProps) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={onDecrease}
        className="bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg w-10 h-10 flex items-center justify-center"
        aria-label="Diminuir fonte"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        onClick={onIncrease}
        className="bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg w-10 h-10 flex items-center justify-center"
        aria-label="Aumentar fonte"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FontSizeControls;