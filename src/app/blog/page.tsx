import { getAllPosts } from "@/lib/posts";
import BlogListClient from "@/components/BlogListClient";

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListClient posts={posts} />;
}
