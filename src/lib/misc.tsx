import type { TreeViewItem } from '@/components/molecule/tree-item';

import { Globe, Folder, FolderOpen, File, Download } from 'lucide-react';

export const customIconMap = {
  region: <Globe className="h-4 w-4 text-purple-500" />,
  store: <Folder className="h-4 w-4 text-blue-500" />,
  department: <FolderOpen className="h-4 w-4 text-green-500" />,
  item: <File className="h-4 w-4 text-orange-500" />,
};

export const menuItems = [
  {
    id: 'download',
    label: 'Download',
    icon: <Download className="h-4 w-4" />,
    action: (items: TreeViewItem[]) => console.log('Downloading:', items),
  },
];

export const levelMap: Record<number, string> = {
  0: 'region',
  1: 'store',
  2: 'department',
  3: 'item',
};

export type TreeItem = {
  id: string;
  name: string;
  type: string;
  children?: TreeItem[];
};

export const algorithmsTree = {
  id: '1',
  name: 'Algorithms',
  children: [],
  type: levelMap[0],
};

export const dataStructuresTree = {
  id: '1',
  name: 'Data Structures',
  children: [],
  type: levelMap[0],
};
