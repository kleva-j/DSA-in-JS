/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HTMLAttributes, ComponentProps, FC } from 'react';

import { Separator } from '@/components/atoms/separator';
import { Icons } from '@/components/atoms/icons';
import { Code } from '@/components/atoms/mdx';
import { cn } from '@/lib/utils';

import {
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
  Accordion,
} from '@/components/atoms/accordion';

import {
  AlertDescription,
  AlertContent,
  AlertTitle,
  AlertIcon,
  Alert,
} from '@/components/atoms/alert';

interface MDXComponents {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: FC<any> | MDXComponents;
}

type CodeProps = React.DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  language: string;
  code: string;
};

export const Components: MDXComponents = {
  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-hidden rounded-lg border">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn('border-b bg-muted/40', className)} {...props} />
  ),
  tbody: ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn('divide-y divide-muted', className)} {...props} />
  ),
  tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('', className)} {...props} />
  ),
  th: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th className={cn('p-4 text-left text-sm font-semibold', className)} {...props} />
  ),
  td: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn('p-4 text-sm text-muted-foreground', className)} {...props} />
  ),
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground text-base/7',
        className
      )}
      {...props}
    />
  ),
  pre: (props) => {
    return (
      <Code
        language={(props as CodeProps).language}
        title={(props as CodeProps).title}
        code={(props as CodeProps).code}
      />
    );
  },
  strong: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className={cn('font-semibold', className)} {...props} />
  ),
  hr: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <Separator className={cn('my-8', className)} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('font-medium text-foreground underline underline-offset-4', className)}
      {...props}
    />
  ),
  code: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement> & {
    'data-inline'?: string;
  }) => {
    // const isInline = props['data-inline'] === '';
    console.log({ props });
    return (
      <code
        className={cn(
          // isInline &&
          'relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-normal text-sky-700',
          className
        )}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('mt-2 ps-2 space-y-1 font-normal', className)} {...props} />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('mt-2 ps-2 space-y-1 font-normal', className)} {...props} />
  ),
  li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('list-inside list-disc text-base/7', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic text-muted-foreground', className)}
      {...props}
    />
  ),
  Title: ({ className, content, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    if (!content) {
      throw new Error('Title must be provided');
    }
    return (
      <>
        <h1 className={cn('text-3xl font-bold', className)} {...props}>
          {content}
        </h1>
        <title>{`${content} | DSA in JS`}</title>
      </>
    );
  },
  Description: ({ className, content, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
    if (!content || content.length > 160) {
      throw new Error('Meta description must be provided and less than 160 characters');
    }

    return (
      <>
        <p className={cn('mt-2 text-muted-foreground', className)} {...props}>
          {content}
        </p>
        <meta name="description" content={content} />
      </>
    );
  },
  Step: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3 className={cn('step mt-8 font-semibold tracking-tight', className)} {...props} />
  ),
  Steps: ({ ...props }) => (
    <div className="steps mb-12 ml-4 border-l pl-8 [counter-reset:step]" {...props} />
  ),
  AlertDescription,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
  AlertContent,
  AlertTitle,
  Accordion,
  AlertIcon,
  Icons,
  Alert,
};

export function useMDXComponents(): MDXComponents {
  return Components;
}
