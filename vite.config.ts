//vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { watch } from "vite-plugin-watch";
// import contentlayerPlugin from '@ap0nia/vite-plugin-contentlayer';

export default defineConfig({
  plugins: [
    react(),
    watch({
      pattern: "./posts/**/*.{mdx,md}",
      command: "contentlayer build",
    }),
    // contentlayerPlugin()
  ],
  resolve: {
    alias: {
      "contentlayer/generated": "/.contentlayer/generated",
    },
  },
});