import type { Item } from '@/types';

import { Tree, TreeItem, TreeItemLabel } from '@/components/atoms/tree';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { useTree } from '@headless-tree/react';
import { treeItems } from '@/lib/constants';
import { NavLink } from 'react-router';
import { useState } from 'react';

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
} from 'lucide-react';

const indent = 20;

// Find the path from root to the current item
function findPathToCurrent(items: Record<string, Item>, rootId: string): string[] {
  const path: string[] = [];

  function findPath(itemId: string): boolean {
    const item = items[itemId];
    if (!item) return false;

    // If this is the current item, we found the path
    if (item.current) {
      path.unshift(itemId);
      return true;
    }

    // If this item has children, search them
    if (item.children?.length) {
      for (const childId of item.children) {
        if (findPath(childId)) {
          // If we found the path in this branch, add this item to the path
          path.unshift(itemId);
          return true;
        }
      }
    }

    return false;
  }

  findPath(rootId);
  return path;
}

// Get all parent IDs that need to be expanded
const pathToCurrent = findPathToCurrent(treeItems, 'guidelines');
// Remove the current item from the path if it's a leaf node
const expandedItems = pathToCurrent.filter((id) => treeItems[id].children?.length);

console.log({ expandedItems, pathToCurrent });

export function TreeView() {
  const initialExpandedItems = ['engineering', 'frontend', 'design-system'];
  const [state, setState] = useState<Partial<TreeState<Item>>>({});

  const tree = useTree<Item>({
    state,
    setState,
    initialState: {
      expandedItems: initialExpandedItems,
      selectedItems: ['guidelines'],
    },
    indent,
    rootItemId: 'company',
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
    <div className="flex h-full flex-col gap-2 *:nth-2:grow w-full min-w-[350px] max-w-md">
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
                  setState((prevState) => ({ ...prevState, expandedItems: initialExpandedItems }));
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
        className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
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
    </div>
  );
}
