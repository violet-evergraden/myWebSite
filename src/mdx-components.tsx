import type { MDXComponents } from "mdx/types";

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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading("h1"),
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    h5: createHeading("h5"),
    h6: createHeading("h6"),
    ...components,
  };
}
