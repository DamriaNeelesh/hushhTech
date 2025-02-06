// src/lib/posts.ts
export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  Content: React.ComponentType;
  [key: string]: any;
}

const modules = import.meta.glob('../posts/**/*.{md,mdx}', { eager: true });

const posts: PostData[] = Object.entries(modules).map(([filepath, module]: [string, any]) => {
  // Use frontmatter if available, with a fallback
  const fm = module.frontmatter || module.meta || {};
  const slug = filepath
    .replace(/^..\/posts\//, '')
    .replace(/\.(md|mdx)$/, '');
  const category = slug.split('/')[0];
  return {
    slug,
    category,
    title: fm.title || 'No title',
    date: fm.date || '',
    description: fm.description || '',
    ...fm,
    Content: module.default,  // This should be the compiled MDX component
  };
});

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPosts(): PostData[] {
  return posts;
}

export function getPostBySlug(slug: string): PostData | undefined {
  return posts.find((post) => post.slug === slug);
}
