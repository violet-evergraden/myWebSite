"use client";

import BlogCard from "@/components/BlogCard";
import AnimatedText from "@/components/AnimatedText";
import ResponsiveBackground from "@/components/ResponsiveBackground";
import { useState, useMemo } from "react";

interface PostItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  wordCount?: number;
  readingTime?: number;
}

export default function BlogListClient({ posts }: { posts: PostItem[] }) {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6">
      {/* Responsive Background */}
      <ResponsiveBackground
        desktopImage="/images/default.png"
        mobileImage="/images/photo_show.png"
      />
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-5" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <AnimatedText
            text="学习笔记"
            className="text-5xl md:text-7xl font-bold text-gradient block"
          />
          <AnimatedText
            text="记录思考，分享见解，探索未知"
            className="text-white/40 text-lg mt-4 block"
            delay={0.3}
          />
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-white/60 text-sm mb-4">按标签筛选:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  !selectedTag
                    ? "bg-[#39d6c6] text-white font-medium"
                    : "glass text-white/60 hover:text-white hover:bg-white/15"
                }`}
              >
                全部
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                    selectedTag === tag
                      ? "bg-[#39d6c6] text-white font-medium"
                      : "glass text-white/60 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-4">
            {filteredPosts.map((post, i) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                index={i}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-white/60 text-lg mb-2">还没有笔记</p>
            <p className="text-white/30 text-sm">
              在{" "}
              <code className="text-[#39d6c6] font-mono">content/posts/</code>{" "}
              目录下创建 .mdx 文件开始写作
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
