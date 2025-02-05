// src/lib/posts.ts
export interface PostData {
  slug: string;           // e.g. "market/2025-01-28-daily-market-update"
  title: string;
  date: string;
  description: string;
  category: string;
  // The MDX file’s default export is a React component
  Content: React.ComponentType;
  [key: string]: any;
}

// Use Vite's import.meta.glob to load all MD/MDX files in src/posts/
const modules = (import.meta as any).glob('../posts/**/*.{md,mdx}', { eager: true });

// Create an array of posts from the imported modules.
const posts: PostData[] = Object.entries(modules).map(([filepath, module]: [string, any]) => {
  // Assume each module exports a default React component and a frontmatter object.
  const fm = module.frontmatter;
  // Remove the leading "../posts/" and the file extension.
  const slug = filepath
    .replace(/^..\/posts\//, '')
    .replace(/\.(md|mdx)$/, '');
  const category = slug.split('/')[0];
  return {
    slug,
    category,
    title: fm.title || 'No Title',
    date: fm.date || '',
    description: fm.description || '',
    Content: module.default,
    ...fm,
  };
});

// Optional: sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPosts(): PostData[] {
  return posts;
}

export function getPostBySlug(slug: string): PostData | undefined {
  return posts.find((post) => post.slug === slug);
}
