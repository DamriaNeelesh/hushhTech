import { makeSource, defineDocumentType } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title:       { type: 'string', required: true },
    slug:        { type: 'string', required: true },
    category:    { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    accessLevel: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/community/${doc.slug}`,
    },
    // slug: { 
    //   type: 'string', 
    //   resolve: (doc) => doc._raw.flattenedPath 
    // },
  }
}));

const codeOptions = { theme: 'github-dark', grid: false };

export default makeSource({
  contentDirPath: 'Posts',
  documentTypes: [Post],
  disableImportAliasWarning: true,  
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      // [rehypePrettyCode, codeOptions]
    ]
  }
});