import configuration from '../../content-collections.ts';
import { GetTypeByName } from '@content-collections/core';

export type Algorithm = GetTypeByName<typeof configuration, 'algorithms'>;
export declare const allAlgorithms: Array<Algorithm>;

export type DataStructure = GetTypeByName<typeof configuration, 'dataStructures'>;
export declare const allDataStructures: Array<DataStructure>;

export {};
