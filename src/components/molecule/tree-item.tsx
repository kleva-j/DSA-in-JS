import type { TreeViewIconMap, TreeViewMenuItem } from '@/components/molecule/tree';
import type { JSX } from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/atoms/hover-card';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, ChevronRight, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Info } from 'lucide-react';

import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from '@/components/atoms/collapsible';

import {
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenu,
} from '@/components/atoms/context-menu';

export interface TreeViewItem {
  id: string;
  name: string;
  type: string;
  children?: TreeViewItem[];
  checked?: boolean;
}

interface TreeItemProps {
  item: TreeViewItem;
  depth?: number;
  selectedIds: Set<string>;
  lastSelectedId: React.RefObject<string | null>;
  onSelect: (ids: Set<string>) => void;
  expandedIds: Set<string>;
  onToggleExpand: (id: string, isOpen: boolean) => void;
  getIcon?: (item: TreeViewItem, depth: number) => React.ReactNode;
  onAction?: (action: string, items: TreeViewItem[]) => void;
  onAccessChange?: (item: TreeViewItem, hasAccess: boolean) => void;
  allItems: TreeViewItem[];
  showAccessRights?: boolean;
  itemMap: Map<string, TreeViewItem>;
  iconMap?: TreeViewIconMap;
  menuItems?: TreeViewMenuItem[];
  getSelectedItems: () => TreeViewItem[];
}

const getCheckState = (
  item: TreeViewItem,
  itemMap: Map<string, TreeViewItem>
): 'checked' | 'unchecked' | 'indeterminate' => {
  // Get the original item from the map
  const originalItem = itemMap.get(item.id);
  if (!originalItem) return 'unchecked';

  // If it's a leaf node (no children), return its check state
  if (!originalItem.children || originalItem.children.length === 0) {
    return originalItem.checked ? 'checked' : 'unchecked';
  }

  // Count the check states of immediate children
  let checkedCount = 0;
  let indeterminateCount = 0;

  for (const child of originalItem.children) {
    const childState = getCheckState(child, itemMap);
    if (childState === 'checked') checkedCount++;
    if (childState === 'indeterminate') indeterminateCount++;
  }

  // Calculate parent state based on children states
  const totalChildren = originalItem.children.length;

  // If all children are checked
  if (checkedCount === totalChildren) {
    return 'checked';
  }
  // If any child is checked or indeterminate
  if (checkedCount > 0 || indeterminateCount > 0) {
    return 'indeterminate';
  }
  // If no children are checked or indeterminate
  return 'unchecked';
};

const defaultIconMap: TreeViewIconMap = {
  file: <Box className="h-4 w-4 text-red-600" />,
  folder: <Folder className="h-4 w-4 text-primary/80" />,
};

export function TreeItem({
  item,
  depth = 0,
  selectedIds,
  lastSelectedId,
  onSelect,
  expandedIds,
  onToggleExpand,
  getIcon,
  onAction,
  onAccessChange,
  allItems,
  showAccessRights,
  itemMap,
  iconMap = defaultIconMap,
  menuItems,
  getSelectedItems,
}: TreeItemProps): JSX.Element {
  const isOpen = expandedIds.has(item.id);
  const isSelected = selectedIds.has(item.id);
  const itemRef = useRef<HTMLDivElement>(null);
  const [selectionStyle, setSelectionStyle] = useState('');

  // Get all visible items in order
  const getVisibleItems = useCallback(
    (items: TreeViewItem[]): TreeViewItem[] => {
      let visibleItems: TreeViewItem[] = [];

      for (const item of items) {
        visibleItems.push(item);
        if (item.children && expandedIds.has(item.id)) {
          visibleItems = [...visibleItems, ...getVisibleItems(item.children)];
        }
      }

      return visibleItems;
    },
    [expandedIds]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isSelected) {
      setSelectionStyle('');
      return;
    }

    // Get all visible items from the entire tree
    const visibleItems = getVisibleItems(allItems);
    const currentIndex = visibleItems.findIndex((i) => i.id === item.id);

    const prevItem = visibleItems[currentIndex - 1];
    const nextItem = visibleItems[currentIndex + 1];

    const isPrevSelected = prevItem && selectedIds.has(prevItem.id);
    const isNextSelected = nextItem && selectedIds.has(nextItem.id);

    const roundTop = !isPrevSelected;
    const roundBottom = !isNextSelected;

    setSelectionStyle(`${roundTop ? 'rounded-t-md' : ''} ${roundBottom ? 'rounded-b-md' : ''}`);
  }, [isSelected, selectedIds, expandedIds, item.id, getVisibleItems, allItems]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    let newSelection = new Set(selectedIds);

    if (!itemRef.current) return;

    if (e.shiftKey && lastSelectedId.current !== null) {
      const items = Array.from(document.querySelectorAll('[data-tree-item]')) as HTMLElement[];
      const lastIndex = items.findIndex(
        (el) => el.getAttribute('data-id') === lastSelectedId.current
      );
      const currentIndex = items.findIndex((el) => el === itemRef.current);
      const [start, end] = [Math.min(lastIndex, currentIndex), Math.max(lastIndex, currentIndex)];

      for (const el of items.slice(start, end + 1)) {
        const id = el.getAttribute('data-id');
        const parentFolderClosed = el.closest('[data-folder-closed="true"]');
        const isClosedFolder = el.getAttribute('data-folder-closed') === 'true';

        if (id && (isClosedFolder || !parentFolderClosed)) {
          newSelection.add(id);
        }
      }
    } else if (e.ctrlKey || e.metaKey) {
      if (newSelection.has(item.id)) {
        newSelection.delete(item.id);
      } else {
        newSelection.add(item.id);
      }
    } else {
      newSelection = new Set([item.id]);
      // Open folder on single click if it's a folder
      if (item.children && isSelected) {
        onToggleExpand(item.id, !isOpen);
      }
    }

    lastSelectedId.current = item.id;
    onSelect(newSelection);
  };

  // const handleAction = (action: string) => {
  //   if (onAction) {
  //     // Get all selected items, or just this item if none selected
  //     const selectedItems =
  //       selectedIds.size > 0
  //         ? allItems
  //             .flatMap((item) => getAllDescendants(item))
  //             .filter((item) => selectedIds.has(item.id))
  //         : [item];
  //     onAction(action, selectedItems);
  //   }
  // };

  // Helper function to get all descendants of an item (including the item itself)
  // const getAllDescendants = (item: TreeViewItem): TreeViewItem[] => {
  //   const descendants = [item];
  //   if (item.children) {
  //     for (const child of item.children) {
  //       descendants.push(...getAllDescendants(child));
  //     }
  //   }
  //   return descendants;
  // };

  const handleAccessClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAccessChange) {
      const currentState = getCheckState(item, itemMap);
      // Toggle between checked and unchecked, treating indeterminate as unchecked
      const newChecked = currentState !== 'checked';
      onAccessChange(item, newChecked);
    }
  };

  const renderIcon = () => {
    if (getIcon) {
      return getIcon(item, depth);
    }

    // Use the provided iconMap or fall back to default
    return iconMap[item.type] || iconMap.folder || defaultIconMap.folder;
  };

  const getItemPath = (item: TreeViewItem, items: TreeViewItem[]): string => {
    const path: string[] = [item.name];

    const findParent = (currentItem: TreeViewItem, allItems: TreeViewItem[]) => {
      for (const potentialParent of allItems) {
        if (potentialParent.children?.some((child) => child.id === currentItem.id)) {
          path.unshift(potentialParent.name);
          findParent(potentialParent, allItems);
          break;
        }
        if (potentialParent.children) {
          findParent(currentItem, potentialParent.children);
        }
      }
    };

    findParent(item, items);
    return path.join(' → ');
  };

  // Add function to count selected items in a folder
  const getSelectedChildrenCount = (item: TreeViewItem): number => {
    let count = 0;

    if (!item.children) return 0;

    for (const child of item.children) {
      if (selectedIds.has(child.id)) {
        count++;
      }
      if (child.children) {
        count += getSelectedChildrenCount(child);
      }
    }

    return count;
  };

  // Get selected count only if item has children and is collapsed
  const selectedCount = (item.children && !isOpen && getSelectedChildrenCount(item)) || null;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            ref={itemRef}
            data-tree-item
            data-id={item.id}
            data-depth={depth}
            data-folder-closed={item.children && !isOpen}
            className={`select-none cursor-pointer ${
              isSelected ? `bg-orange-100 ${selectionStyle}` : 'text-foreground'
            } px-1`}
            style={{ paddingLeft: `${depth * 20}px` }}
            onClick={handleClick}
          >
            <div className="flex items-center h-8">
              {item.children ? (
                <div className="flex items-center gap-2 flex-1 group">
                  <Collapsible open={isOpen} onOpenChange={(open) => onToggleExpand(item.id, open)}>
                    <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <motion.div
                          initial={false}
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </CollapsibleTrigger>
                  </Collapsible>
                  {showAccessRights && (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                      className="relative flex items-center justify-center w-4 h-4 cursor-pointer hover:opacity-80"
                      onClick={handleAccessClick}
                    >
                      {getCheckState(item, itemMap) === 'checked' && (
                        <div className="w-4 h-4 border rounded bg-primary border-primary flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <title>Check</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                      {getCheckState(item, itemMap) === 'unchecked' && (
                        <div className="w-4 h-4 border rounded border-input" />
                      )}
                      {getCheckState(item, itemMap) === 'indeterminate' && (
                        <div className="w-4 h-4 border rounded bg-primary border-primary flex items-center justify-center">
                          <div className="h-0.5 w-2 bg-primary-foreground" />
                        </div>
                      )}
                    </div>
                  )}
                  {renderIcon()}
                  <span className="flex-1">{item.name}</span>
                  {selectedCount !== null && selectedCount > 0 && (
                    <Badge variant="secondary" className="mr-2 bg-blue-100 hover:bg-blue-100">
                      {selectedCount} selected
                    </Badge>
                  )}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 group-hover:opacity-100 opacity-0 items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>
                            <span className="font-medium">Type:</span>{' '}
                            {item.type.charAt(0).toUpperCase() +
                              item.type.slice(1).replace('_', ' ')}
                          </div>
                          <div>
                            <span className="font-medium">ID:</span> {item.id}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>{' '}
                            {getItemPath(item, allItems)}
                          </div>
                          <div>
                            <span className="font-medium">Items:</span> {item.children?.length || 0}{' '}
                            direct items
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-1 pl-8 group">
                  {showAccessRights && (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                      className="relative flex items-center justify-center w-4 h-4 cursor-pointer hover:opacity-80"
                      onClick={handleAccessClick}
                    >
                      {item.checked ? (
                        <div className="w-4 h-4 border rounded bg-primary border-primary flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <title>Check</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 border rounded border-input" />
                      )}
                    </div>
                  )}
                  {renderIcon()}
                  <span className="flex-1">{item.name}</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 group-hover:opacity-100 opacity-0 items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>
                            <span className="font-medium">Type:</span>{' '}
                            {item.type.charAt(0).toUpperCase() +
                              item.type.slice(1).replace('_', ' ')}
                          </div>
                          <div>
                            <span className="font-medium">ID:</span> {item.id}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>{' '}
                            {getItemPath(item, allItems)}
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              )}
            </div>
          </div>

          {item.children && (
            <Collapsible open={isOpen} onOpenChange={(open) => onToggleExpand(item.id, open)}>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <CollapsibleContent forceMount asChild>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.05 }}
                    >
                      {item.children?.map((child) => (
                        <TreeItem
                          key={child.id}
                          item={child}
                          depth={depth + 1}
                          selectedIds={selectedIds}
                          lastSelectedId={lastSelectedId}
                          onSelect={onSelect}
                          expandedIds={expandedIds}
                          onToggleExpand={onToggleExpand}
                          getIcon={getIcon}
                          onAction={onAction}
                          onAccessChange={onAccessChange}
                          allItems={allItems}
                          showAccessRights={showAccessRights}
                          itemMap={itemMap}
                          iconMap={iconMap}
                          menuItems={menuItems}
                          getSelectedItems={getSelectedItems}
                        />
                      ))}
                    </motion.div>
                  </CollapsibleContent>
                )}
              </AnimatePresence>
            </Collapsible>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {menuItems?.map((menuItem) => (
          <ContextMenuItem
            key={menuItem.id}
            onClick={() => {
              const items = selectedIds.has(item.id) ? getSelectedItems() : [item];
              menuItem.action(items);
            }}
          >
            {menuItem.icon && <span className="mr-2 h-4 w-4">{menuItem.icon}</span>}
            {menuItem.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
