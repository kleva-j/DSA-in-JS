import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { badgeVariants } from '@/lib/variants';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
