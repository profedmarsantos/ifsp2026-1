import React from 'react';
import { Button } from '@/components/ui/button';

interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
}

const FontSizeControls = ({ onIncrease, onDecrease }: FontSizeControlsProps) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={onDecrease}
        className="bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg w-8 h-8 flex items-center justify-center"
        aria-label="Diminuir fonte"
      >
        <span className="text-sm font-bold">a</span> {/* 'a' minúsculo para diminuir */}
      </Button>
      <Button
        onClick={onIncrease}
        className="bg-lavender-button hover:bg-lavender-button-hover text-lavender-button-foreground shadow-md rounded-lg w-8 h-8 flex items-center justify-center"
        aria-label="Aumentar fonte"
      >
        <span className="text-lg font-bold">A</span> {/* 'A' maiúsculo para aumentar */}
      </Button>
    </div>
  );
};

export default FontSizeControls;