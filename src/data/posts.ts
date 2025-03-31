import { Post, allPosts } from 'contentlayer/generated';

export const posts: Post[] = Array.isArray(allPosts)
  ? allPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  : [];

  console.log("All posts:", posts); 
