import type { TreeViewItem } from '@/components/molecule/tree-item';

import { Globe, Folder, FolderOpen, File, Download } from 'lucide-react';
import { TreeView } from '@/components/molecule/tree';

const data = [
  {
    id: '1',
    name: 'Algorithms',
    type: 'region',
    children: [
      {
        id: '1.1',
        name: 'Sorting',
        type: 'store',
        children: [
          {
            id: '1.1.1',
            name: 'Bubble Sort',
            type: 'department',
            children: [
              { id: '1.1.1.1', name: 'Bubble Sort', type: 'item' },
              { id: '1.1.1.2', name: 'Quick Sort', type: 'item' },
            ],
          },
          {
            id: '1.1.2',
            name: 'Searching',
            type: 'department',
            children: [
              { id: '1.1.2.1', name: 'Binary Search', type: 'item' },
              { id: '1.1.2.2', name: 'Linear Search', type: 'item' },
            ],
          },
        ],
      },
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

export const AlgorithmsPageRoute = () => {
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
