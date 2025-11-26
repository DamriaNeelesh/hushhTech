import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  plugins: [
    react(),
    mdx({
      // ensure MDX compiles to React JSX
      jsxImportSource: 'react',
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      rehypePlugins: [rehypeSlug],
      // optional: treat .md files as MDX too
      // format: 'detect'
    }),
  ],
  build: {
    outDir: 'dist',
    // strongly recommend cleaning to avoid stale assets on Vercel
    emptyOutDir: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
  },
})
