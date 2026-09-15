import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/callout";
import { Endpoint } from "@/components/endpoint";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (p) => <h1 className="mb-4 text-4xl text-navy" {...p} />,
    h2: (p) => <h2 className="mb-3 mt-10 border-b border-border pb-2 text-2xl text-navy" {...p} />,
    h3: (p) => <h3 className="mb-2 mt-7 text-xl text-navy" {...p} />,
    p: (p) => <p className="my-3 text-[15px] leading-relaxed" {...p} />,
    ul: (p) => <ul className="my-3 list-disc pl-6 text-[15px]" {...p} />,
    ol: (p) => <ol className="my-3 list-decimal pl-6 text-[15px]" {...p} />,
    a: (p) => <a className="font-semibold text-electric hover:underline" {...p} />,
    table: (p) => <div className="my-5 overflow-x-auto rounded-xl border border-border"><table className="w-full text-sm" {...p} /></div>,
    th: (p) => <th className="bcn-label bg-surface p-3 text-left" {...p} />,
    td: (p) => <td className="border-t border-border p-3 align-top" {...p} />,
    code: (p) => <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13px]" {...p} />,
    pre: (p) => <pre className="my-4 overflow-x-auto rounded-xl bg-navy p-4 text-[13px] text-white [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-white" {...p} />,
    hr: () => <hr className="my-8 border-border" />,
    Callout, Endpoint,
    ...components,
  };
}
