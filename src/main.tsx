import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./styles/prism-theme.css"; // Importa o tema Prism VS

window.addEventListener("vite:preloadError", (event) => {
	event.preventDefault();
	window.location.reload();
});

createRoot(document.getElementById("root")!).render(<App />);