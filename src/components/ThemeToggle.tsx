"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = React.useState(theme === "dark");

  React.useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const handleToggle = (newChecked: boolean) => {
    setChecked(newChecked);
    setTheme(newChecked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2 p-4 rounded-lg bg-card shadow-sm">
      <Sun className="h-5 w-5 text-yellow-500" />
      <Label htmlFor="theme-switch" className="sr-only">
        Alternar tema
      </Label>
      <Switch
        id="theme-switch"
        checked={checked}
        onCheckedChange={handleToggle}
        aria-label="Alternar entre tema claro e escuro"
      />
      <Moon className="h-5 w-5 text-blue-500" />
    </div>
  );
};

export default ThemeToggle;