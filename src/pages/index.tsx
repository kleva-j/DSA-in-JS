import type { TreeViewItem } from '@/components/molecule/tree-item';

import { Globe, Folder, FolderOpen, File, Download } from 'lucide-react';
import { generateTreeItemRecursively } from '@/lib/utils';
import { TreeView } from '@/components/molecule/tree';
import { NavLink, Outlet } from 'react-router';
import { NavLinkCls } from '@/lib/misc';
import { tree } from '@/lib/constants';

function loadModulesAndGenerateTreeView() {
  const dsGlob = import.meta.glob('../data-structures/**/*.{ts,tsx,mdx}', { eager: true });
  const algGlob = import.meta.glob('../algorithms/**/*.{ts,tsx,mdx}', { eager: true });

  for (const path of Object.keys({ ...dsGlob, ...algGlob })) {
    const modulePath = path.split('/').slice(1);
    generateTreeItemRecursively(tree, modulePath, 0);
  }

  return tree;
}

const data = loadModulesAndGenerateTreeView();

export function App() {
  function handleCheckChange(item: TreeViewItem, checked: boolean) {
    console.log(`Item ${item.name} checked:`, checked);
  }

  return (
    <section className="bg-background h-screen">
      <div className="container mx-auto h-full flex flex-col gap-4 py-4">
        <h1 className="text-3xl font-bold text-center">Data Structures & Algorithms</h1>
        <div className="flex justify-center gap-4">
          <NavLink to="algorithms" className={NavLinkCls}>
            Algorithms
          </NavLink>
          <NavLink to="data-structures" className={NavLinkCls}>
            Data Structures
          </NavLink>
        </div>
        <div className="text-center text-muted-foreground animate-fade-in-scale">
          Select a module to view its content
        </div>
        <div className="flex gap-4 mt-4">
          <TreeView
            onCheckChange={handleCheckChange}
            iconMap={{
              department: <FolderOpen className="h-4 w-4 text-green-500" />,
              region: <Globe className="h-4 w-4 text-purple-500" />,
              store: <Folder className="h-4 w-4 text-blue-500" />,
              item: <File className="h-4 w-4 text-orange-500" />,
            }}
            title="Data Structures"
            menuItems={[
              {
                id: 'download',
                label: 'Download',
                icon: <Download className="h-4 w-4" />,
                action: (items: TreeViewItem[]) => console.log('Downloading:', items),
              },
            ]}
            data={[data]}
          />
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default App;
