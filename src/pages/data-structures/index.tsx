import type { GetTypeByName } from '@content-collections/core';

import type configuration from 'content-collections.ts';

import { allDataStructures as data } from 'content-collections';
import { MDXContent } from '@content-collections/mdx/react';
import { useLocation } from 'react-router';

export type DataStructure = GetTypeByName<typeof configuration, 'dataStructures'>;

export function DataStructuresPageRoute() {
  const slug = useLocation().pathname.split('/').pop();

  const [document] = (data as DataStructure[]).filter((doc) => doc._meta.path === slug);

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <section className="flex flex-col flex-1 gap-2">
      <div className="border p-2 rounded">
        <h2 className="text-base font-semibold">{document.title}</h2>
      </div>
      <div key={document._meta.path} className="border p-2 rounded">
        <MDXContent code={document.mdx} />
      </div>
    </section>
  );
}
