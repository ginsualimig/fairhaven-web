import { marked } from "marked";

export default function MarkdownContent({ content, className = "" }: { content: string; className?: string }) {
  const html = marked.parse(content, { async: false }) as string;
  return (
    <div
      className={`prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-teal prose-strong:text-navy ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
