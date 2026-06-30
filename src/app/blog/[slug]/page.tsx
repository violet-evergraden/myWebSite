import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogSidebar from "@/components/BlogSidebar";
import ReadingProgress from "@/components/ReadingProgress";
import ResponsiveBackground from "@/components/ResponsiveBackground";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

// 生成 slug ID
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

// 创建带 id 的标题组件
const createHeading = (Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
  return ({ children, ...props }: any) => {
    const id = props.id || generateId(children?.toString() || "");
    
    return (
      <Tag {...props} id={id} className="scroll-mt-24">
        {children}
      </Tag>
    );
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  try {
    const post = getPostBySlug(slug);
    
    return (
      <div className="relative min-h-screen">
        {/* Responsive Background Image */}
        <ResponsiveBackground
          desktopImage="/images/default.png"
          mobileImage="/images/photo_show.png"
        />
        
        {/* Dark overlay */}
        <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-5" />

        {/* Reading Progress Bar */}
        <ReadingProgress />

        {/* Main Content */}
        <article className="relative z-10 pt-32 pb-20 px-6">
        {/* 目录和阅读设置侧边栏（客户端组件） */}
        <BlogSidebar />
        
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 
                       transition-colors text-sm mb-12 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M10 4l-4 4 4 4" />
            </svg>
            返回笔记
          </Link>

          {/* Header */}
          <header className="mb-12">
            <time className="text-xs text-white/30 font-mono">{post.date}</time>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">
              {post.title}
            </h1>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mb-4 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {post.wordCount || 0} 字
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime || 0} 分钟阅读
              </span>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content - render as MDX */}
          <div className="prose prose-invert max-w-none">
            <MDXRemote 
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypePrism],
                },
              }}
              components={{
                h1: createHeading("h1"),
                h2: createHeading("h2"),
                h3: createHeading("h3"),
                h4: createHeading("h4"),
                h5: createHeading("h5"),
                h6: createHeading("h6"),
              }}
            />
          </div>
        </div>
      </article>
      </div>
    );
  } catch {
    notFound();
  }
}
