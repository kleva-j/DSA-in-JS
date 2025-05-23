import type { TreeViewItem } from '@/components/molecule/tree-item';

import { Globe, Folder, FolderOpen, File, Download } from 'lucide-react';
import { TreeView } from '@/components/molecule/tree';

const customIconMap = {
  region: <Globe className="h-4 w-4 text-purple-500" />,
  store: <Folder className="h-4 w-4 text-blue-500" />,
  department: <FolderOpen className="h-4 w-4 text-green-500" />,
  item: <File className="h-4 w-4 text-orange-500" />,
};

const menuItems = [
  {
    id: 'download',
    label: 'Download',
    icon: <Download className="h-4 w-4" />,
    action: (items: TreeViewItem[]) => console.log('Downloading:', items),
  },
];

const levelMap: Record<number, string> = {
  0: 'region',
  1: 'store',
  2: 'department',
  3: 'item',
};

type TreeItem = {
  id: string;
  name: string;
  type: string;
  children?: TreeItem[];
};

function genTreeNodeId(parentId: string, index: number) {
  return index === 0 ? `${parentId}` : `${parentId}.${index}`;
}

function generateTreeDfs(node: TreeItem, pathParts: string[], index: number) {
  if (pathParts.length === 0 || index >= pathParts.length) return;

  const name = pathParts[index];
  const hasReachedEnd = index === pathParts.length - 1;
  const isFile =
    (hasReachedEnd && pathParts[index].endsWith('.ts')) ||
    pathParts[index].endsWith('.tsx') ||
    pathParts[index].endsWith('.mdx');
  const children = node.children ?? [];
  const child = children.find((child: TreeItem) => child.name === name);

  if (!child) {
    const id = genTreeNodeId(node.id, children.length + 1);

    const newNode = { id, name, type: isFile ? 'item' : levelMap[index + 1] } as TreeItem;
    if (!hasReachedEnd) newNode.children = [];

    children.push(newNode);

    generateTreeDfs(newNode, pathParts, index + 1);
  } else {
    generateTreeDfs(child, pathParts, index + 1);
  }
}

type Module = { [key: string]: { default: unknown } };

function loadModuleAndGenerateTreeView() {
  const module = import.meta.glob('../algorithms/**/*.{ts,tsx,mdx}', { eager: true }) as Module;

  const tree = {
    id: genTreeNodeId('1', 0),
    name: 'Algorithms',
    children: [],
    type: levelMap[0],
  };

  for (const path in module) {
    const modulePath = path.split('/').slice(2);
    generateTreeDfs(tree, modulePath, 0);
  }

  return tree;
}

const modules = loadModuleAndGenerateTreeView();

export const AlgorithmsPageRoute = () => {
  const handleCheckChange = (item: TreeViewItem, checked: boolean) => {
    console.log(`Item ${item.name} checked:`, checked);
  };

  return (
    <TreeView
      onCheckChange={handleCheckChange}
      data={[modules]}
      iconMap={customIconMap}
      menuItems={menuItems}
      title="Algorithms"
    />
  );
};
