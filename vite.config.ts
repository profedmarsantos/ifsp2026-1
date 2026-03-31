import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  base: process.env.VITE_APP_BASE_PATH || '/', // Usa variável de ambiente para a base
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("react-markdown") ||
            id.includes("remark-gfm") ||
            id.includes("rehype-raw") ||
            id.includes("mdast") ||
            id.includes("hast") ||
            id.includes("micromark") ||
            id.includes("unified") ||
            id.includes("unist")
          ) {
            return "markdown";
          }

          if (id.includes("prismjs")) {
            return "prism";
          }

          if (id.includes("react") || id.includes("scheduler")) {
            return "react-core";
          }

          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("lucide-react")) {
            return "ui-kit";
          }

          if (id.includes("date-fns") || id.includes("react-day-picker")) {
            return "date-utils";
          }

          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts";
          }

          if (id.includes("react-router") || id.includes("@tanstack/react-query")) {
            return "framework";
          }

          return "vendor";
        },
      },
    },
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));