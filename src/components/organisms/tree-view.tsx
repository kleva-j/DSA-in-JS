import type { TreeViewItem } from '@/components/molecule/tree-item';
import type { TreeViewMenuItem } from '@/components/molecule/tree';

import { Folder, FolderOpen, File, Globe, Share2, Download, Trash2 } from 'lucide-react';
import { TreeView } from '@/components/molecule/tree';
import { treeViewTestData } from '@/lib/constants';
import { useState } from 'react';

const customIconMap = {
  department: <FolderOpen className="h-4 w-4 text-green-500" />,
  region: <Globe className="h-4 w-4 text-purple-500" />,
  store: <Folder className="h-4 w-4 text-blue-500" />,
  item: <File className="h-4 w-4 text-orange-500" />,
};

export const TreeViewOrganism = () => {
  const [treeData, setTreeData] = useState<TreeViewItem[]>(treeViewTestData);

  const handleAction = (action: string, items: TreeViewItem[]) => {
    if (action === 'add_to_shipment' && items.length > 0) {
      handleCheckChange(items, true);
    }
  };

  const handleCheckChange = (items: TreeViewItem | TreeViewItem[], checked: boolean) => {
    const itemsArray = Array.isArray(items) ? items : [items];

    const updateCheckState = (treeItems: TreeViewItem[]): TreeViewItem[] => {
      return treeItems.map((currentItem) => {
        if (itemsArray.some((item) => item.id === currentItem.id)) {
          if (currentItem.children) {
            return {
              ...currentItem,
              checked,
              children: updateAllChildren(currentItem.children, checked),
            };
          }
          return { ...currentItem, checked };
        }
        if (currentItem.children) {
          return {
            ...currentItem,
            children: updateCheckState(currentItem.children),
          };
        }
        return currentItem;
      });
    };

    const updateAllChildren = (children: TreeViewItem[], checked: boolean): TreeViewItem[] => {
      return children.map((child) => ({
        ...child,
        checked,
        children: child.children ? updateAllChildren(child.children, checked) : undefined,
      }));
    };

    setTreeData((prevData) => updateCheckState(prevData));
  };

  const menuItems: TreeViewMenuItem[] = [
    {
      id: 'add_to_shipment',
      label: 'Add to Shipment',
      icon: <Share2 className="h-4 w-4" />,
      action: (items) => handleCheckChange(items, true),
    },
    {
      id: 'download',
      label: 'Download',
      icon: <Download className="h-4 w-4" />,
      action: (items) => console.log('Downloading:', items),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      action: (items) => console.log('Deleting:', items),
    },
  ];

  return (
    <TreeView
      className="max-h-screen overflow-y-auto"
      onCheckChange={handleCheckChange}
      title="Retail Store Hierarchy"
      iconMap={customIconMap}
      showCheckboxes={true}
      showExpandAll={false}
      onAction={handleAction}
      menuItems={menuItems}
      data={treeData}
    />
  );
};
