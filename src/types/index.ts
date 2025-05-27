export type Module = {
  [key: string]: {
    default: unknown;
    loader?: unknown;
    action?: unknown;
    ErrorBoundary?: unknown;
  };
};

export type TreeItem = {
  id: string;
  name: string;
  type: string;
  children?: TreeItem[];
};

export interface NavLinkProps {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}
