// contentlayer.config.js
import { makeSource, defineDocumentType } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import GithubSlugger from 'github-slugger';

const Post = defineDocumentType(() => ({
  name: 'Post',
  // This will match all .md and .mdx files in the posts folder (and subfolders)
  filePathPattern: '**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    // updatedAt: { type: 'date', required: true },
    description: { type: 'string', required: true },
    // author: { type: 'string', required: true },
    // tags: { type: 'list', of: { type: 'string' } },
    // category: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      // This generates a URL like "/community/market/2025-01-28-daily-market-update"
      resolve: (doc) => `/community/${doc.category}/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: 'json',
      resolve: async (doc) => {
        const regex = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regex)).map(({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            level: flag?.length === 1 ? 'one' : flag?.length === 2 ? 'two' : 'three',
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        });
        return headings;
      },
    },
  },
}));

const codeOptions = { theme: 'github-dark', grid: false };

export default makeSource({
  contentDirPath: 'posts', // Your posts are stored in the /posts folder
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, codeOptions],
    ],
  },
});
