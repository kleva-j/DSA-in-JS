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

export interface Item {
  name: string;
  href?: string;
  children?: string[];
  current?: boolean;
}

// Prettify
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Loose AutoComplete (example)
export type ModelNames =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'anthropic-'
  | 'deepseek-chat'
  | 'gemini-2.5-pro'
  | 'claude-sonnet-3.7'
  | (string & {});

// Mapped Types
type User = {
  id: string;
  name: string;
  age: number;
};

export type UserTransformed = {
  readonly [K in keyof User]?: User[K];
};

export type UserTransformed2 = {
  [K in keyof User as Capitalize<K>]: User[K];
};

export type UserTransformed3 = {
  [K in keyof User as `get${Capitalize<K>}`]: () => User[K];
};

// Objects to Discriminated Unions
export type Action = {
  login: { username: string; password: string };
  logout: { reason: string };
  update: { field: keyof User; value: User[keyof User] };
};

export type ActionAsUnion = {
  [K in keyof Action]: { type: K } & Action[K];
};

export type PrettyActionAsUnion = {
  [K in keyof ActionAsUnion]: Prettify<{ type: K } & Action[K]>;
};

export type ActionAsUnion2 = PrettyActionAsUnion[keyof ActionAsUnion];
