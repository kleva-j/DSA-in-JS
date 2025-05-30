import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { slugify } from '@/lib/utils';
import { z } from 'zod';

import { rehypeParseCodeBlocks } from '@/shiki-rehype.mjs';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const defaultPaths = [
  { name: 'algorithms', directory: 'src/paths/algorithms' },
  { name: 'dataStructures', directory: 'src/paths/data-structures' },
];

const collections = defaultPaths.map((path) => {
  return defineCollection({
    name: path.name,
    directory: path.directory,
    include: ['**/*.mdx'],
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      author: z.string(),
      date: z.coerce.date(),
      segments: z.optional(z.array(z.string())),
    }),
    transform: async (document, context) => {
      const mdx = await compileMDX(context, document, {
        rehypePlugins: [
          rehypeParseCodeBlocks,
          [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
        ],
      });
      const regXHeader = /^(?:[\n\r]|)(?<flag>#{1,6})\s+(?<content>.+)/gm;
      const headings = Array.from(document.content.matchAll(regXHeader)).map(({ groups }) => {
        const flag = groups?.flag;
        const content = groups?.content;
        return {
          level: flag?.length,
          text: content,
          slug: slugify(content ?? '#'),
        };
      });
      return { ...document, headings, mdx, segments: document._meta.path.split('/') };
    },
  });
});

export default defineConfig({ collections });
