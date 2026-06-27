import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import AnimatedText from "@/components/AnimatedText";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/default.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
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

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post, i) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                index={i}
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
