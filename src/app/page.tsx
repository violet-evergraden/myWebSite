import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import HomeHero from "@/components/HomeHero";
import FeatureCards from "@/components/FeatureCards";
import ResponsiveBackground from "@/components/ResponsiveBackground";

export default function Home() {
  const posts = getAllPosts();
  
  // 获取所有标签并去重
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      {/* Responsive Background Image */}
      <ResponsiveBackground
        desktopImage="/images/default.png"
        mobileImage="/images/photo_show.png"
      />
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-5" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <HomeHero />

        {/* Feature Cards Grid */}
        <FeatureCards tags={allTags} />

        {/* Latest Notes */}
        {posts.length > 0 && (
          <section className="max-w-[900px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              最新笔记
            </h2>
            
            <div className="grid gap-4">
              {posts.slice(0, 5).map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  slug={post.slug}
                  tags={post.tags}
                  index={0}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
