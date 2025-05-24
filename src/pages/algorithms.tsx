import type { TreeViewItem } from '@/components/molecule/tree-item';
import type { Module } from '@/types';

import { algorithmsTree as tree } from '@/lib/misc';

import { generateTreeItemRecursively } from '@/lib/utils';
import { customIconMap, menuItems } from '@/lib/misc';
import { TreeView } from '@/components/molecule/tree';

function loadModuleAndGenerateTreeView() {
  const module = import.meta.glob('../algorithms/**/*.{ts,tsx,mdx}', { eager: true }) as Module;

  for (const path in module) {
    const modulePath = path.split('/').slice(2);
    generateTreeItemRecursively(tree, modulePath, 0);
  }

  return tree;
}

const data = loadModuleAndGenerateTreeView();

export const AlgorithmsPageRoute = () => {
  const handleCheckChange = (item: TreeViewItem, checked: boolean) => {
    console.log(`Item ${item.name} checked:`, checked);
  };

  return (
    <TreeView
      onCheckChange={handleCheckChange}
      iconMap={customIconMap}
      menuItems={menuItems}
      title="Algorithms"
      data={[data]}
    />
  );
};
