import type { GetTypeByName } from '@content-collections/core';

import type configuration from 'content-collections.ts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { allAlgorithms as data } from 'content-collections';
import { MDXContent } from '@content-collections/mdx/react';
import { Components } from '@/components/mdx-components';
import { useLocation } from 'react-router';
import { slugify } from '@/lib/utils';
import { FileCode } from 'lucide-react';

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from '@/components/atoms/accordion';

type Algorithm = GetTypeByName<typeof configuration, 'algorithms'>;

type Heading = { level: number; text: string; slug: string };

export function AlgorithmsPageRoute() {
  const slug = useLocation().pathname.split('/').pop();

  const [document] = (data as Algorithm[]).filter((doc) => doc._meta.path === slug);

  if (!document)
    return (
      <div className="h-[calc(100vh-16rem)] grid place-items-center">
        <h3 className="text-2xl font-normal font-mono text-muted-foreground">Document not found</h3>
      </div>
    );

  const headings = document.headings as Heading[];

  const sections = headings.map((heading, i) => {
    return { id: i, title: heading.text, slug: heading.slug };
  });

  return (
    <section className="flex flex-col flex-1">
      <div className="fixed left-0 top-16 h-full w-full">
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#9ca3af,transparent_1px)] [background-size:16px_16px]" />
      </div>
      <div className="flex gap-6 flex-row-reverse justify-end mx-auto z-1">
        <div className="sticky top-16">
          <Accordion
            type="single"
            collapsible
            className="w-[18rem] space-y-2"
            defaultValue="#table-of-contents"
          >
            <AccordionItem
              value="#table-of-contents"
              key="#table-of-contents"
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border pb-1 outline-none last:border-b has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="justify-start gap-3 rounded-none rounded-t-md py-2.5 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1 data-[state=open]:bg-gray-500/10 px-4 transition-colors duration-500">
                Table of Contents
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground ps-10 pb-2 transition-colors duration-300">
                <ul className="space-y-2 py-2 list-disc list-outside">
                  {sections.map((section) => (
                    <li key={section.id} className="hover:text-gray-800 cursor-pointer">
                      <a href={`#${section.slug}`}>{section.title}</a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="#files"
              key="#files"
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                Files
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground ps-7 pb-2">
                <ul className="space-y-2 py-2">
                  <li
                    key={document._meta.fileName}
                    className="flex items-center gap-2 hover:text-gray-800 cursor-pointer"
                  >
                    <FileCode className="size-4 stroke-[1.5px]" />
                    {document._meta.fileName}
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Card className="w-full shadow-none max-w-4xl rounded-md pt-0 " key={document._meta.path}>
          <CardHeader className="flex flex-row items-center justify-between py-4 bg-gray-500/10">
            <CardTitle className="text-sm font-normal">{document.title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate prose-sm lg:prose-lg">
            <MDXContent
              components={{
                // Headings
                h1: ({ children }) => {
                  const element = sections.find((entry) => entry.title === children?.toString());

                  if (!element) return null;

                  return (
                    <h1
                      id={slugify(element.title.toLowerCase())}
                      className="relative scroll-mt-44 lg:scroll-mt-32 text-muted-light text-3xl tracking-tight font-medium"
                    >
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const element = sections.find((entry) => entry.title === children?.toString());

                  if (!element) return null;

                  return (
                    <h2
                      id={slugify(element.title.toLowerCase())}
                      className="relative scroll-mt-44 lg:scroll-mt-32 text-muted-light text-2xl tracking-tight font-medium"
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const element = sections.find((entry) => entry.title === children?.toString());

                  if (!element) return null;

                  return (
                    <h3
                      id={slugify(element.title.toLowerCase())}
                      className="relative scroll-mt-44 lg:scroll-mt-32 text-muted-light text-xl tracking-tight font-medium"
                    >
                      {children}
                    </h3>
                  );
                },
                h4: ({ children }) => {
                  const element = sections.find((entry) => entry.title === children?.toString());

                  if (!element) return null;

                  return (
                    <h4
                      id={slugify(element.title.toLowerCase())}
                      className="relative scroll-mt-44 lg:scroll-mt-32 text-muted-light text-lg tracking-tight font-medium"
                    >
                      {children}
                    </h4>
                  );
                },
                ...Components,
              }}
              code={document.mdx}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
