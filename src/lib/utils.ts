import type { TreeViewItem } from '@/components/molecule/tree-item';

import { clsx, type ClassValue } from 'clsx';
import { levelMap } from '@/lib/constants';
import { twMerge } from 'tailwind-merge';
import { tree } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genTreeNodeId(parentId: string, index: number) {
  return index === 0 ? `${parentId}` : `${parentId}.${index}`;
}

export function generateTreeItemRecursively(
  parent: TreeViewItem,
  pathComponents: string[],
  currentIndex: number
): void {
  const isLastComponent = currentIndex === pathComponents.length - 1;
  const componentName = pathComponents[currentIndex];
  const componentType =
    isLastComponent && componentName.endsWith('.ts') ? 'item' : levelMap[currentIndex + 1];

  const existingComponent = parent.children?.find((child) => child.name === componentName);
  const newComponent = existingComponent ?? {
    id: `${parent.id}.${parent.children?.length ?? 0}`,
    name: componentName,
    type: componentType,
    children: isLastComponent ? undefined : [],
  };

  if (!existingComponent) {
    parent.children = [...(parent.children ?? []), newComponent];
  }

  if (!isLastComponent) {
    generateTreeItemRecursively(newComponent, pathComponents, currentIndex + 1);
  }
}

export function loadModulesAndGenerateTreeView() {
  const dsGlob = import.meta.glob('../data-structures/**/*.{ts,tsx,mdx}', { eager: true });
  const algGlob = import.meta.glob('../algorithms/**/*.{ts,tsx,mdx}', { eager: true });

  for (const path of Object.keys({ ...dsGlob, ...algGlob })) {
    const modulePath = path.split('/').slice(1);
    generateTreeItemRecursively(tree, modulePath, 0);
  }

  return tree;
}

export function slugify(text: string) {
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
