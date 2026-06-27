import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import HomeHero from "@/components/HomeHero";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/default.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-5" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <HomeHero />

        {/* Feature Cards Grid */}
        <FeatureCards />

        {/* Latest Notes */}
        {posts.length > 0 && (
          <section className="max-w-[900px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              最新笔记
            </h2>
            
            <div className="grid gap-4">
              {posts.slice(0, 3).map((post) => (
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
