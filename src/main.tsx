import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./lib/prism/register-portugol"; // Importa o registro da linguagem Portugol

createRoot(document.getElementById("root")!).render(<App />);