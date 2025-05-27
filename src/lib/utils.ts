import type { TreeViewItem } from '@/components/molecule/tree-item';

import { clsx, type ClassValue } from 'clsx';
import { levelMap } from '@/lib/constants';
import { twMerge } from 'tailwind-merge';

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
