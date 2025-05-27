import type { ButtonProps } from '@/components/atoms/button';

import { Toolbar as BaseToolbar } from '@base-ui-components/react/toolbar';
import { buttonVariants } from '@/lib/variants';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Toolbar = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>>(
  ({ className, ...props }, ref) => {
    return (
      <BaseToolbar.Root
        className={cn('flex items-center gap-1 rounded-md border bg-popover p-1', className)}
        {...props}
        ref={ref}
      />
    );
  }
);
Toolbar.displayName = 'Toolbar';

const ToolbarButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Button> & ButtonProps
>(({ className, variant, size = 'md', ...props }, ref) => {
  return (
    <BaseToolbar.Button
      className={cn(
        buttonVariants({ variant: variant ?? 'ghost', size: size ?? 'md' }),
        'shrink-0',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
ToolbarButton.displayName = 'ToolbarButton';

const ToolbarSeparator = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>
>((props, ref) => {
  return (
    <BaseToolbar.Separator className={cn('h-6 w-px shrink-0 bg-muted')} {...props} ref={ref} />
  );
});
ToolbarSeparator.displayName = 'ToolbarSeparator';

const ToolbarInput = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Input>
>((props, ref) => {
  return <BaseToolbar.Input {...props} ref={ref} />;
});
ToolbarInput.displayName = 'ToolbarInput';

const ToolbarGroup = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>
>(({ className, ...props }, ref) => {
  return (
    <BaseToolbar.Group className={cn('flex items-center gap-1', className)} {...props} ref={ref} />
  );
});
ToolbarGroup.displayName = 'ToolbarGroup';

const ToolbarLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Link>
>(({ className, ...props }, ref) => {
  return (
    <BaseToolbar.Link
      ref={ref}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
});
ToolbarLink.displayName = 'ToolbarLink';

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarInput, ToolbarGroup, ToolbarLink };
