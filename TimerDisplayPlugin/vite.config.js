import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      formats: ["es"],
    },
  },
});
