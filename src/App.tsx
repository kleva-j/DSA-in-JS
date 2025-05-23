import { buttonVariants } from '@/lib/variants';
import { NavLink, Outlet } from 'react-router';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}

const className = ({ isActive, isPending, isTransitioning }: NavLinkProps) =>
  cn(
    buttonVariants({ variant: isActive ? 'default' : 'outline' }),
    isPending && 'opacity-50',
    isTransitioning && 'opacity-50'
  );

export function App() {
  return (
    <section className="bg-background h-screen">
      <div className="container mx-auto h-full flex flex-col gap-4 py-4">
        <h1 className="text-3xl font-bold text-center">Data Structures & Algorithms</h1>
        <div className="flex justify-center gap-4">
          <NavLink to="algorithms" className={className}>
            Algorithms
          </NavLink>
          <NavLink to="data-structures" className={className}>
            Data Structures
          </NavLink>
        </div>
        <div className="flex justify-center mt-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default App;
