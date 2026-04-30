import { defineConfig } from "vite";
import path from "path";
import { componentTagger } from "lovable-tagger";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mode === "development" && componentTagger(),
    legacy({
      targets: ["defaults", "not IE 11", "Chrome >= 60", "Safari >= 12", "iOS >= 12", "Firefox >= 60", "Edge >= 79"],
      modernTargets: "Chrome >= 60, Safari >= 12, iOS >= 12, Firefox >= 60, Edge >= 79",
      modernPolyfills: true,
      renderLegacyChunks: true,
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ].filter(Boolean),
  build: {
    target: "es2017",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
