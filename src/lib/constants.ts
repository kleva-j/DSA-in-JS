import type { Item } from '@/types';

export const treeItems: Record<string, Item> = {
  company: {
    name: 'Company',
    children: ['engineering', 'marketing', 'operations'],
  },
  engineering: {
    name: 'Engineering',
    children: ['frontend', 'backend', 'platform-team'],
  },
  frontend: { name: 'Frontend', children: ['design-system', 'web-platform'] },
  'design-system': {
    name: 'Design System',
    children: ['components', 'tokens', 'guidelines'],
  },
  components: { name: 'Components', href: '/algorithms/components', current: true },
  tokens: { name: 'Tokens', href: '/algorithms/tokens' },
  guidelines: { name: 'Guidelines', href: '/algorithms/guidelines' },
  'web-platform': { name: 'Web Platform', href: '/algorithms/web-platform' },
  backend: { name: 'Backend', children: ['apis', 'infrastructure'] },
  apis: { name: 'APIs', href: '/algorithms/apis' },
  infrastructure: { name: 'Infrastructure', href: '/algorithms/infrastructure' },
  'platform-team': { name: 'Platform Team', href: '/data-structures/platform-team' },
  marketing: { name: 'Marketing', children: ['content', 'seo'] },
  content: { name: 'Content', href: '/data-structures/content' },
  seo: { name: 'SEO', href: '/data-structures/seo' },
  operations: { name: 'Operations', children: ['hr', 'finance'] },
  hr: { name: 'HR', href: '/data-structures/hr' },
  finance: { name: 'Finance', href: '/data-structures/finance' },
};

export const DSATreeItems: Record<string, Item> = {
  path: {
    name: 'Path',
    children: ['algorithms', 'data-structures'],
  },
  algorithms: {
    name: 'Algorithms',
    children: [
      'searching',
      'sorting',
      'recursion',
      'backtracking',
      'greedy',
      'dynamic-programming',
      'brute-force',
    ],
  },
  searching: { name: 'Searching', children: ['binary-search', 'linear-search', 'jump-search'] },
  'binary-search': { name: 'Binary Search', href: '/algorithms/searching/binary-search' },
  'linear-search': { name: 'Linear Search', href: '/algorithms/searching/linear-search' },
  'jump-search': { name: 'Jump Search', href: '/algorithms/searching/jump-search' },
  sorting: {
    name: 'Sorting',
    children: ['bubble-sort', 'quick-sort', 'merge-sort', 'insertion-sort', 'selection-sort'],
  },
  'bubble-sort': { name: 'Bubble Sort', href: '/algorithms/sorting/bubble-sort' },
  'quick-sort': { name: 'Quick Sort', href: '/algorithms/sorting/quick-sort' },
  'merge-sort': { name: 'Merge Sort', href: '/algorithms/sorting/merge-sort' },
  'insertion-sort': { name: 'Insertion Sort', href: '/algorithms/sorting/insertion-sort' },
  'selection-sort': { name: 'Selection Sort', href: '/algorithms/sorting/selection-sort' },
  recursion: {
    name: 'Recursion',
    children: ['tower-of-hanoi', 'permutations', 'fibonacci', 'factorial'],
  },
  'tower-of-hanoi': { name: 'Tower of Hanoi', href: '/algorithms/recursion/tower-of-hanoi' },
  permutations: { name: 'Permutations', href: '/algorithms/recursion/permutations' },
  fibonacci: { name: 'Fibonacci', href: '/algorithms/recursion/fibonacci' },
  factorial: { name: 'Factorial', href: '/algorithms/recursion/factorial' },
  backtracking: { name: 'Backtracking', children: ['n-queens', 'sudoku'] },
  'n-queens': { name: 'N Queens', href: '/algorithms/backtracking/n-queens' },
  sudoku: { name: 'Sudoku', href: '/algorithms/backtracking/sudoku' },
  greedy: { name: 'Greedy', children: ['fractional-knapsack', 'huffman-coding'] },
  'fractional-knapsack': {
    name: 'Fractional Knapsack',
    href: '/algorithms/greedy/fractional-knapsack',
  },
  'huffman-coding': { name: 'Huffman Coding', href: '/algorithms/greedy/huffman-coding' },
  'dynamic-programming': { name: 'Dynamic Programming', children: ['knapsack', 'coin-change'] },
  knapsack: { name: 'Knapsack', href: '/algorithms/dynamic-programming/knapsack' },
  'coin-change': { name: 'Coin Change', href: '/algorithms/dynamic-programming/coin-change' },
  'brute-force': { name: 'Brute Force', children: ['simple-brute-force'] },
  'simple-brute-force': {
    name: 'Simple Brute Force',
    href: '/algorithms/brute-force/simple-brute-force',
  },

  // Data Structures
  'data-structures': {
    name: 'Data Structures',
    children: [
      'strings',
      'array',
      'linked-list',
      'stack',
      'queue',
      'trees',
      'graphs',
      'hash-table',
      'heaps',
      'tries',
    ],
  },
  strings: { name: 'Strings', href: '/data-structures/strings' },
  array: { name: 'Array', href: '/data-structures/array' },
  'linked-list': { name: 'Linked List', href: '/data-structures/linked-list' },
  stack: { name: 'Stack', href: '/data-structures/stack' },
  queue: { name: 'Queue', href: '/data-structures/queue' },
  trees: { name: 'Trees', href: '/data-structures/trees' },
  graphs: { name: 'Graphs', href: '/data-structures/graphs' },
  'hash-table': { name: 'Hash Table', href: '/data-structures/hash-table' },
  heaps: { name: 'Heaps', href: '/data-structures/heaps' },
  tries: { name: 'Tries', href: '/data-structures/tries' },
};

export const levelMap: Record<number, string> = {
  0: 'region',
  1: 'store',
  2: 'department',
  3: 'item',
};

export const tree = {
  id: '1',
  name: 'Modules',
  children: [],
  type: levelMap[0],
};
