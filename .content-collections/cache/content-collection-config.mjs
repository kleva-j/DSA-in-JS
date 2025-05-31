// content-collections.ts
import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';

// src/lib/utils.ts
import { clsx } from 'clsx';

// src/lib/constants.ts
var levelMap = {
  0: 'region',
  1: 'store',
  2: 'department',
  3: 'item',
};
var tree = {
  id: '1',
  name: 'Modules',
  children: [],
  type: levelMap[0],
};

// src/lib/utils.ts
import { twMerge } from 'tailwind-merge';
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .trim()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// content-collections.ts
import { z } from 'zod';

// src/shiki-rehype.mjs
import { visit } from 'unist-util-visit';
function rehypeParseCodeBlocks() {
  return (tree2) => {
    visit(tree2, 'element', (node, _nodeIndex, parentNode) => {
      if (node.tagName === 'code' && node.properties?.className) {
        const language = node.properties.className[0]?.replace(/^language-/, '') || 'text';
        const metastring = node.data?.meta || '';
        let title = null;
        if (metastring) {
          const excludeMatch = metastring.match(/\s+\/([^/]+)\//);
          if (excludeMatch) {
            const cleanMetastring = metastring.replace(excludeMatch[0], '');
            const titleMatch = cleanMetastring.match(/^([^{]+)/);
            if (titleMatch) {
              title = titleMatch[1].trim();
            }
          } else {
            const titleMatch = metastring.match(/^([^{]+)/);
            if (titleMatch) {
              title = titleMatch[1].trim();
            }
          }
        }
        parentNode.properties = parentNode.properties || {};
        parentNode.properties.language = language;
        parentNode.properties.title = title;
        parentNode.properties.meta = metastring;
        const codeContent = node.children[0]?.value || '';
        parentNode.properties.code = [
          `\`\`\`${language}${metastring ? ` ${metastring}` : ''}`,
          codeContent.trimEnd(),
          '```',
        ].join('\n');
      }
    });
  };
}

// content-collections.ts
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
var defaultPaths = [
  { name: 'algorithms', directory: 'src/paths/algorithms' },
  { name: 'dataStructures', directory: 'src/paths/data-structures' },
];
var collections = defaultPaths.map((path) => {
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
var content_collections_default = defineConfig({ collections });
export { content_collections_default as default };
