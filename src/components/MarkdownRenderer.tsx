import Markdoc from "@markdoc/markdoc";
import React, { JSX } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface MarkdownRendererProps {
  contents: string;
}
interface MarkdownLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
interface MarkdownCodeProps {
  content: string;
  className?: string;
}

export function MarkdownLink({ href, children, className }: MarkdownLinkProps) {
  return (
    <a
      href={href}
      className={cn("text-[#0969DA] underline mt-2", className)}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function MarkdownCode({ className, content }: MarkdownCodeProps) {
  return <code className={cn(className)}>{content}</code>;
}
export function MarkdownText({ className, content }: MarkdownCodeProps) {
  return <span className={cn(className)}>{content}</span>;
}

function MarkDownHeading({
  level,
  children,
  className,
}: {
  level: number;
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  switch (level) {
    case 1:
      return (
        <Tag
          className={`text-3xl pb-2 font-bold my-4 border-b border-gray-300`}
        >
          {children}
        </Tag>
      );
    case 2:
      return (
        <Tag
          className={`text-2xl pb-2 font-bold my-4 border-b border-gray-300`}
        >
          {children}
        </Tag>
      );
    case 3:
      return (
        <Tag className={`text-lg font-bold mb-2 ${className}`}>{children}</Tag>
      );
    case 4:
      return (
        <Tag className={`text-base font-semibold mb-1 ${className}`}>
          {children}
        </Tag>
      );
    case 5:
      return (
        <Tag className={`text-sm font-semibold mb-1 ${className}`}>
          {children}
        </Tag>
      );
    default:
      return (
        <h6 className={`text-sm font-semibold mb-1 ${className}`}>
          {children}
        </h6>
      );
  }
}

export function Table({
  children
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table
      className={`divide-y divide-gray-200 border rounded-lg border-gray-200 my-4 block overflow-auto`}
    >
      {children}
    </table>
  );
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
}

export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={className}>{children}</tr>;
}

export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 truncate ${className}`}>{children}</td>
  );
}

export function TableHeaderCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

const HTML = ({ content }:{content:string}) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export function MarkdownRenderer({ contents }: MarkdownRendererProps) {
  const ast = Markdoc.parse(contents);
  const config = {
    nodes: {
      paragraph: {
        render: "p",
        attributes: {
          className: { type: String, default: "my-2 text-base" },
        },
      },
      heading: {
        render: "MarkDownHeading",
        attributes: {
          className: { type: String },
          level: { type: Number, required: true },
        },
      },
      link: {
        render: "MarkdownLink",
        attributes: {
          href: { type: String },
          title: { type: String },
          className: { type: String },
        },
      },
      list: {
        render: "ul",
        attributes: {
          className: { type: String, default: "list-disc pl-8 mb-4 leading-7" },
        },
      },
      fence: {
        render: "CodeBlock",
        attributes: {
          className: {
            type: String,
            default: "bg-gray-100 p-4 rounded-md mb-4",
          },
          language: { type: String },
        },
      },
      table: {
        render: "Table",
        attributes: {
          className: { type: String },
        },
      },
      thead: {
        render: "TableHead",
        attributes: {
          className: { type: String },
        },
      },
      tbody: {
        render: "TableBody",
        attributes: {
          className: { type: String },
        },
      },
      tr: {
        render: "TableRow",
        attributes: {
          className: { type: String },
        },
      },
      th: {
        render: "TableHeaderCell",
        attributes: {
          className: { type: String },
        },
      },
      td: {
        render: "TableCell",
        attributes: {
          className: { type: String },
        },
      },
      code: {
        render: "MarkdownCode",
        attributes: {
          className: {
            type: String,
            default: "bg-gray-100 rounded-md p-1 text-sm",
          },
          content: { type: String },
        },
      },
      text: {
        render: "MarkdownText",
        attributes: {
          className: { type: String },
          content: { type: String },
        },
      },
      html:{
        render: 'HTML',
        attributes: {
          content: { type: String }
        }
      }
    },
  };

  const content = Markdoc.transform(ast, config);
  const html = Markdoc.renderers.react(content, React, {
    components: {
      MarkdownLink,
      MarkdownCode,
      CodeBlock,
      MarkDownHeading,
      Table,
      TableHead,
      TableBody,
      TableRow,
      TableCell,
      TableHeaderCell,
      MarkdownText,
      HTML
    },
  });

  return <>{html}</>;
}
