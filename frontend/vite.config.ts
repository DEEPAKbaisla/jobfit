import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    minify: "esbuild", // ✅ fastest minifier
    sourcemap: false,  // ✅ disable sourcemaps in production
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router": ["react-router"],
          "radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "@radix-ui/react-separator",
            "@radix-ui/react-label",
            "@radix-ui/react-toast",
          ],
          "utils": ["axios", "sonner"],
        },
      },
    },
  },
  // ✅ optimize dev server
  server: {
    warmup: {
      clientFiles: ["./src/main.tsx", "./src/App.tsx"],
    },
  },
});