// src/lib/posts.ts
export interface PostData {
  slug: string;
  title: string;
  publishedAt?: string; // if you also use "publishedAt"
  date?: string;
  description: string;
  category: string;
  Content: React.ComponentType;
  // Spread any other fields if needed (image, accessLevel, etc.)
  [key: string]: any;
}

// IMPORTANT: your content/posts folder is TWO levels up from src/lib
// So the correct path is ../../content/posts/**/*.{md,mdx}
const modules = import.meta.glob('../../content/posts/**/*.{md,mdx}', { eager: true });

const mdxPosts: PostData[] = Object.entries(modules).map(([filepath, module]: [string, any]) => {
  const fm = module.frontmatter || module.meta || {};
  // unify date to publishedAt if your MDX uses publishedAt
  const publishedAt = fm.publishedAt || fm.date || '';
  // generate or use the frontmatter slug
  const slug = fm.slug
    ? fm.slug
    : filepath
        .replace(/^.*\/content\/posts\//, '')
        .replace(/\.(md|mdx)$/, '');
  const category = fm.category || slug.split('/')[0];

  return {
    ...fm,
    slug,
    category,
    title: fm.title || 'No title',
    publishedAt,
    description: fm.description || '',
    Content: module.default, // compiled MDX component
  };
});

// Sort by publishedAt descending if you want chronological order
mdxPosts.sort((a, b) => {
  const dateA = new Date(a.publishedAt || a.date).getTime();
  const dateB = new Date(b.publishedAt || b.date).getTime();
  return dateB - dateA;
});

/** 
 * Provide getPosts() so that App.tsx or other files can import { getPosts } 
 * without causing the “does not provide an export named 'getPosts'” error.
 */
export function getPosts(): PostData[] {
  return mdxPosts;
}

/**
 * Optional: If you need to get a single MDX post by slug
 */
export function getPostBySlug(slug: string): PostData | undefined {
  return mdxPosts.find((post) => post.slug === slug);
}
