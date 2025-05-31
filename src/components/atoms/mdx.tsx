import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import { CopyButton } from '@/components/atoms/copy-button';
import { Icons } from '@/components/atoms/icons';
import { useEffect, useState } from 'react';
import { unified } from 'unified';

import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';

interface CodeProps {
  title?: string;
  language: string;
  code: string;
}

export function Code({ title, language, code }: CodeProps) {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    highlightCode(code).then((code) => {
      setHighlightedCode(code);
    });
  }, [code]);

  const Icon =
    language === 'bash'
      ? Icons.terminal
      : language === 'ts' || language === 'tsx'
        ? Icons.typescript
        : () => null;

  return (
    <div className="border border-dark-gray rounded-sm bg-[#22272e]/95 h-min">
      {title ? (
        <div className="rounded-t-md flex items-center justify-between h-10 px-4 bg-slate-950/50 border-b border-dark-gray">
          <div className="flex items-center gap-2.5">
            {Icon && <Icon className="grayscale size-4" />}
            <p className="text-sm font-medium text-gray-300 my-0 h-min">{title}</p>
          </div>
          <CopyButton code={code} />
        </div>
      ) : null}
      <ScrollArea className="[&>div]:bg-gray-50 [&>div]:px-4">
        <div className="relative w-full bg-[#22272e] rounded antialiased">
          {!title && (
            <div className="absolute right-2 top-2">
              <CopyButton code={code} />
            </div>
          )}
          <section
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: 'github-dark-default' })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}
