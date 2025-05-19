import type { TreeViewItem } from '@/components/molecule/tree-item';

import { Globe, Folder, FolderOpen, File, Download } from 'lucide-react';
import { TreeView } from '@/components/molecule/tree';

const data = [
  {
    id: '1',
    name: 'Data Structures',
    type: 'region',
    children: [
      { id: '1.1', name: 'Strings', type: 'store' },
      { id: '1.2', name: 'Arrays', type: 'store' },
      { id: '1.3', name: 'Linked Lists', type: 'store' },
      { id: '1.4', name: 'Stacks', type: 'store' },
      { id: '1.5', name: 'Queues', type: 'store' },
      { id: '1.6', name: 'Trees', type: 'store' },
      { id: '1.7', name: 'Graphs', type: 'store' },
      { id: '1.8', name: 'Hash Tables', type: 'store' },
      { id: '1.9', name: 'Heaps', type: 'store' },
      { id: '1.10', name: 'Tries', type: 'store' },
    ],
  },
];

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

export const DataStructuresPageRoute = () => {
  const handleCheckChange = (item: TreeViewItem, checked: boolean) => {
    console.log(`Item ${item.name} checked:`, checked);
  };

  return (
    <TreeView
      data={data}
      title="Algorithms"
      menuItems={menuItems}
      iconMap={customIconMap}
      onCheckChange={handleCheckChange}
    />
  );
};
