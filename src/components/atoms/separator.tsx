import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

interface SeparatorProps extends ComponentProps<typeof SeparatorPrimitive.Root> {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

function Separator(props: SeparatorProps) {
  const { className, orientation = 'horizontal', decorative = true, ...restProps } = props;
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...restProps}
    />
  );
}

export { Separator };
