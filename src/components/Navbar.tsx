import { getAllPosts } from "@/lib/posts";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  const posts = getAllPosts().map(({ slug, title, date, excerpt, tags }) => ({
    slug,
    title,
    date,
    excerpt,
    tags,
  }));

  return <NavbarClient posts={posts} />;
}
