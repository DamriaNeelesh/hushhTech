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
  
  server: {
    proxy: {
      '/api': {
        target: 'https://hushh-api-53407187172.us-central1.run.app',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
  },
});
