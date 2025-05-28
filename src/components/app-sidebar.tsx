import type { ComponentProps } from 'react';
import type { Item } from '@/types';

import { Tree, TreeItem, TreeItemLabel } from '@/components/atoms/tree';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { useTree } from '@headless-tree/react';
import { DSATreeItems as treeItems } from '@/lib/constants';
import { NavLink, useLocation } from 'react-router';
import { useState } from 'react';

import {
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarRail,
  SidebarMenu,
  Sidebar,
} from '@/components/atoms/sidebar';

import {
  type TreeState,
  syncDataLoaderFeature,
  hotkeysCoreFeature,
  expandAllFeature,
  selectionFeature,
  searchFeature,
} from '@headless-tree/core';

import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from '@/components/atoms/tooltip';

import {
  ListCollapseIcon,
  FolderOpenIcon,
  ListTreeIcon,
  FolderIcon,
  SearchIcon,
  Combine,
} from 'lucide-react';

const indent = 20;

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const pathGroup = pathname.split('/').filter(Boolean);
  const initialExpandedItems = pathGroup;
  const [state, setState] = useState<Partial<TreeState<Item>>>({});

  const tree = useTree<Item>({
    state,
    setState,
    initialState: {
      expandedItems: initialExpandedItems,
      selectedItems: ['guidelines'],
    },
    indent,
    rootItemId: 'path',
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => treeItems[itemId],
      getChildren: (itemId) => treeItems[itemId].children ?? [],
    },
    features: [
      syncDataLoaderFeature,
      hotkeysCoreFeature,
      selectionFeature,
      expandAllFeature,
      searchFeature,
    ],
  });

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Combine className="size-7 stroke-[2px]" />
              <span className="text-lg font-medium">Practise DSA</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Explorer</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  className="peer ps-9"
                  {...{
                    ...tree.getSearchInputElementProps(),
                    onChange: (e) => {
                      // First call the original onChange handler from getSearchInputElementProps
                      const originalProps = tree.getSearchInputElementProps();
                      if (originalProps.onChange) {
                        originalProps.onChange(e);
                      }

                      // Then handle our custom logic
                      const value = e.target.value;

                      if (value.length > 0) {
                        // If input has at least one character, expand all items
                        tree.expandAll();
                      } else {
                        // If input is cleared, reset to initial expanded state
                        setState((prevState) => ({
                          ...prevState,
                          expandedItems: initialExpandedItems,
                        }));
                      }
                    },
                  }}
                  type="search"
                  placeholder="Quick search..."
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <SearchIcon className="size-4" aria-hidden="true" />
                </div>
              </div>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => tree.expandAll()}>
                      <ListTreeIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs">Expand all</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={tree.collapseAll}>
                      <ListCollapseIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs">Collapse all</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Tree
              indent={indent}
              tree={tree}
              className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))] border rounded-sm mt-2"
            >
              {tree.getItems().map((item) => {
                const href = item.getItemData()?.href;

                const Content = (
                  <span className="flex items-center gap-2">
                    {item.isFolder() &&
                      (item.isExpanded() ? (
                        <FolderOpenIcon className="text-muted-foreground pointer-events-none size-4" />
                      ) : (
                        <FolderIcon className="text-muted-foreground pointer-events-none size-4" />
                      ))}
                    {item.getItemName()}
                    {item.isFolder() && (
                      <span className="text-muted-foreground -ms-1">
                        {`(${item.getChildren().length})`}
                      </span>
                    )}
                  </span>
                );
                return (
                  <TreeItem key={item.getId()} item={item}>
                    {href ? (
                      <NavLink to={href} data-current={item.getItemData().current}>
                        <TreeItemLabel>{Content}</TreeItemLabel>
                      </NavLink>
                    ) : (
                      <TreeItemLabel>{Content}</TreeItemLabel>
                    )}
                  </TreeItem>
                );
              })}
            </Tree>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
