import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // Split heavy, seldom-needed libs out of the entry chunk.
          if (
            id.includes("/react-markdown/") ||
            id.includes("/rehype-highlight/") ||
            id.includes("/highlight.js/")
          ) {
            return "markdown";
          }
          if (
            id.includes("/react-simplemde-editor/") ||
            id.includes("/easymde/")
          ) {
            return "editor";
          }
          if (id.includes("/react-select/")) {
            return "select";
          }
        },
      },
    },
  },
});
