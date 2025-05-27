import type { NavLinkProps } from '@/types';

import { buttonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

export const NavLinkCls = ({ isActive, isPending, isTransitioning }: NavLinkProps) =>
  cn(
    buttonVariants({ variant: isActive ? 'default' : 'outline' }),
    isPending && 'opacity-50',
    isTransitioning && 'opacity-50'
  );
