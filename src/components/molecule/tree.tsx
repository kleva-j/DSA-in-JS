'use client';

import type { TreeViewItem } from '@/components/molecule/tree-item';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import { TreeItem } from '@/components/molecule/tree-item';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { cn } from '@/lib/utils';

export interface TreeViewIconMap {
  [key: string]: React.ReactNode | undefined;
}

export interface TreeViewMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  action: (items: TreeViewItem[]) => void;
}

export interface TreeViewProps {
  className?: string;
  data: TreeViewItem[];
  title?: string;
  showExpandAll?: boolean;
  showCheckboxes?: boolean;
  checkboxPosition?: 'left' | 'right';
  searchPlaceholder?: string;
  selectionText?: string;
  checkboxLabels?: {
    check: string;
    uncheck: string;
  };
  getIcon?: (item: TreeViewItem, depth: number) => React.ReactNode;
  onSelectionChange?: (selectedItems: TreeViewItem[]) => void;
  onAction?: (action: string, items: TreeViewItem[]) => void;
  onCheckChange?: (item: TreeViewItem, checked: boolean) => void;
  iconMap?: TreeViewIconMap;
  menuItems?: TreeViewMenuItem[];
}

// Helper function to build a map of all items by ID
const buildItemMap = (items: TreeViewItem[]): Map<string, TreeViewItem> => {
  const map = new Map<string, TreeViewItem>();
  const processItem = (item: TreeViewItem) => {
    map.set(item.id, item);
    item.children?.forEach(processItem);
  };
  items.forEach(processItem);
  return map;
};

export function TreeView({
  className,
  checkboxLabels = {
    check: 'Check',
    uncheck: 'Uncheck',
  },
  data,
  iconMap,
  searchPlaceholder = 'Search...',
  selectionText = 'selected',
  showExpandAll = true,
  showCheckboxes = false,
  getIcon,
  onSelectionChange,
  onAction,
  onCheckChange,
  menuItems,
}: TreeViewProps) {
  const [currentMousePos, setCurrentMousePos] = useState<number>(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const dragRef = useRef<HTMLDivElement>(null);
  const lastSelectedId = useRef<string | null>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const DRAG_THRESHOLD = 10; // pixels

  // Create a map of all items by ID
  const itemMap = useMemo(() => buildItemMap(data), [data]);

  // Memoize the search results and expanded IDs
  const { filteredData, searchExpandedIds } = useMemo(() => {
    if (!searchQuery.trim()) {
      return { filteredData: data, searchExpandedIds: new Set<string>() };
    }

    const searchLower = searchQuery.toLowerCase();
    const newExpandedIds = new Set<string>();

    // Helper function to check if an item or its descendants match the search
    const itemMatches = (item: TreeViewItem): boolean => {
      const nameMatches = item.name.toLowerCase().includes(searchLower);
      if (nameMatches) return true;

      if (item.children) {
        return item.children.some((child) => itemMatches(child));
      }

      return false;
    };

    // Helper function to filter tree while keeping parent structure
    const filterTree = (items: TreeViewItem[]): TreeViewItem[] => {
      return items
        .map((item) => {
          if (!item.children) {
            return itemMatches(item) ? item : null;
          }

          const filteredChildren = filterTree(item.children);
          if (filteredChildren.length > 0 || itemMatches(item)) {
            if (item.children) {
              newExpandedIds.add(item.id);
            }
            return {
              ...item,
              children: filteredChildren,
            };
          }
          return null;
        })
        .filter((item): item is TreeViewItem => item !== null);
    };

    return {
      filteredData: filterTree(data),
      searchExpandedIds: newExpandedIds,
    };
  }, [data, searchQuery]);

  // Update expanded IDs when search changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedIds((prev) => new Set([...prev, ...searchExpandedIds]));
    }
  }, [searchExpandedIds, searchQuery]);

  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      const target = e.target as Element;

      const clickedInside =
        treeRef.current?.contains(target) ||
        dragRef.current?.contains(target) ||
        // Ignore clicks on context menus
        target.closest('[role="menu"]') ||
        target.closest('[data-radix-popper-content-wrapper]');

      if (!clickedInside) {
        setSelectedIds(new Set());
        lastSelectedId.current = null;
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, []);

  // Function to collect all folder IDs
  const getAllFolderIds = (items: TreeViewItem[]): string[] => {
    let ids: string[] = [];
    for (const item of items) {
      if (item.children) {
        ids.push(item.id);
        ids = [...ids, ...getAllFolderIds(item.children)];
      }
    }
    return ids;
  };

  const handleExpandAll = () => {
    setExpandedIds(new Set(getAllFolderIds(data)));
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  const handleToggleExpand = (id: string, isOpen: boolean) => {
    const newExpandedIds = new Set(expandedIds);
    if (isOpen) {
      newExpandedIds.add(id);
    } else {
      newExpandedIds.delete(id);
    }
    setExpandedIds(newExpandedIds);
  };

  // Get selected items
  const getSelectedItems = useCallback((): TreeViewItem[] => {
    const items: TreeViewItem[] = [];
    const processItem = (item: TreeViewItem) => {
      if (selectedIds.has(item.id)) {
        items.push(item);
      }
      item.children?.forEach(processItem);
    };
    for (const item of data) {
      processItem(item);
    }
    return items;
  }, [selectedIds, data]);

  // Get selected items, filtering out parents if their children are selected
  const getEffectiveSelectedItems = useCallback((): TreeViewItem[] => {
    const selectedItems = getSelectedItems();

    // Build a set of all selected IDs for quick lookup
    const selectedIdsSet = new Set(selectedItems.map((item) => item.id));

    // Filter out parents whose children are also selected
    return selectedItems.filter((item) => {
      // If this item has no children, always include it
      if (!item.children) return true;

      // Check if any children of this item are selected
      const hasSelectedChildren = item.children.some((child) => selectedIdsSet.has(child.id));

      // Only include this item if none of its children are selected
      return !hasSelectedChildren;
    });
  }, [getSelectedItems]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only track on left click and not on buttons
    if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;

    setDragStartPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Check if primary button is still held down
      if (!(e.buttons & 1)) {
        setIsDragging(false);
        setDragStart(null);
        setDragStartPosition(null);
        return;
      }

      // If we haven't registered a potential drag start position, ignore
      if (!dragStartPosition) return;

      // Calculate distance moved
      const deltaX = e.clientX - dragStartPosition.x;
      const deltaY = e.clientY - dragStartPosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // If we haven't started dragging yet, check if we should start
      if (!isDragging) {
        if (distance > DRAG_THRESHOLD) {
          setIsDragging(true);
          setDragStart(dragStartPosition.y);

          // Clear selection if not holding shift/ctrl
          if (!e.shiftKey && !e.ctrlKey) {
            setSelectedIds(new Set());
            lastSelectedId.current = null;
          }
        }
        return;
      }

      // Rest of the existing drag logic
      if (!dragRef.current) return;

      const items = Array.from(
        dragRef.current.querySelectorAll('[data-tree-item]')
      ) as HTMLElement[];

      const startY = dragStart;
      const currentY = e.clientY;
      const [selectionStart, selectionEnd] = [
        Math.min(startY || 0, currentY),
        Math.max(startY || 0, currentY),
      ];

      const newSelection = new Set(e.shiftKey || e.ctrlKey ? Array.from(selectedIds) : []);

      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top;
        const itemBottom = rect.top + rect.height;

        if (itemBottom >= selectionStart && itemTop <= selectionEnd) {
          const id = item.getAttribute('data-id');
          const isClosedFolder = item.getAttribute('data-folder-closed') === 'true';
          const parentFolderClosed = item.closest('[data-folder-closed="true"]');

          if (id && (isClosedFolder || !parentFolderClosed)) {
            newSelection.add(id);
          }
        }
      }

      setSelectedIds(newSelection);
      setCurrentMousePos(e.clientY);
    },
    [isDragging, dragStart, selectedIds, dragStartPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
    setDragStartPosition(null);
  }, []);

  // Add cleanup for mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging, handleMouseUp]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(getSelectedItems());
    }
  }, [selectedIds, onSelectionChange, getSelectedItems]);

  return (
    <div className="flex gap-4">
      <div
        ref={treeRef}
        className="bg-background p-4 rounded border max-w-2xl space-y-4 w-[600px] relative shadow"
      >
        <AnimatePresence mode="wait">
          {selectedIds.size > 0 ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-10 flex items-center justify-between bg-background rounded-lg border px-4"
            >
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div
                className="font-medium cursor-pointer flex items-center"
                title="Clear selection"
                onClick={() => {
                  setSelectedIds(new Set());
                  lastSelectedId.current = null;
                }}
              >
                <X className="h-4 w-4 mr-2" />
                {selectedIds.size} {selectionText}
              </div>

              {showCheckboxes && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const effectiveItems = getEffectiveSelectedItems();
                      const processItem = (item: TreeViewItem) => {
                        onCheckChange?.(item, true);
                        item.children?.forEach(processItem);
                      };
                      effectiveItems.forEach(processItem);
                    }}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    {checkboxLabels.check}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const effectiveItems = getEffectiveSelectedItems();
                      const processItem = (item: TreeViewItem) => {
                        onCheckChange?.(item, false);
                        item.children?.forEach(processItem);
                      };
                      effectiveItems.forEach(processItem);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {checkboxLabels.uncheck}
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="h-10 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="h-10 pl-9"
                />
              </div>
              {showExpandAll && (
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="sm" className="h-10 px-2" onClick={handleExpandAll}>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Expand All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 px-2"
                    onClick={handleCollapseAll}
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Collapse All
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={dragRef}
          className={cn('rounded-lg bg-card relative select-none', className)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {isDragging && (
            <div
              className="absolute inset-0 bg-blue-500/0 pointer-events-none"
              style={{
                top: Math.min(dragStart || 0, dragStart === null ? 0 : currentMousePos),
                height: Math.abs((dragStart || 0) - (dragStart === null ? 0 : currentMousePos)),
              }}
            />
          )}
          {filteredData.map((item) => (
            <TreeItem
              key={item.id}
              item={item}
              selectedIds={selectedIds}
              lastSelectedId={lastSelectedId}
              onSelect={setSelectedIds}
              expandedIds={expandedIds}
              onToggleExpand={handleToggleExpand}
              getIcon={getIcon}
              onAction={onAction}
              onAccessChange={onCheckChange}
              allItems={data}
              showAccessRights={showCheckboxes}
              itemMap={itemMap}
              iconMap={iconMap}
              menuItems={menuItems}
              getSelectedItems={getSelectedItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
