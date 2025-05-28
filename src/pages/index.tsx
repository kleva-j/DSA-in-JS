import { TreeView } from '@/components/molecule/tree-view';
import { NavLink, Outlet } from 'react-router';
import { NavLinkCls } from '@/lib/misc';

export function App() {
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
          <div className="border p-4 rounded-sm">
            <TreeView />
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default App;
