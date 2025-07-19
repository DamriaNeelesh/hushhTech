import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import mdx from '@mdx-js/rollup';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkGfm from 'remark-gfm';
// import rehypeSlug from 'rehype-slug';

export default defineConfig({
  plugins: [
    react(),
    // mdx({
    //   remarkPlugins: [remarkFrontmatter, remarkGfm],
    //   rehypePlugins: [rehypeSlug],
    // }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: false, 
  },
  
  // Removed proxy configuration as it conflicts with direct API calls
  server: {
    // No proxy needed since we're using full URLs
  },
  
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
  },
});
