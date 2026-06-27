import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogSidebar from "@/components/BlogSidebar";
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
