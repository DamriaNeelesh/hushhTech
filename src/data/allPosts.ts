// src/data/allPosts.ts
import { getPosts as getLegacyPosts, PostData as LegacyPostData } from './posts';
import { getPosts as getMdxPosts, PostData as MdxPostData } from '../lib/posts';

// unify the interface
export type PostData = LegacyPostData; 

export function getAllPosts(): PostData[] {
  const legacy = getLegacyPosts();
  const mdx = getMdxPosts();
  const all = [...legacy, ...mdx];

  // Sort by publishedAt descending
  all.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.date).getTime();
    const dateB = new Date(b.publishedAt || b.date).getTime();
    return dateB - dateA;
  });
  return all;
}

export function getPostBySlug(slug: string): PostData | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}