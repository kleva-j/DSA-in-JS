import { describe, expect, test } from 'vitest';

import { ArrayClass } from './index';

describe('ArrayClass', () => {
  test('constructor', () => {
    const array = new ArrayClass();
    expect(array.getAll()).toEqual([]);
  });

  test('constructor with arguments', () => {
    const array = new ArrayClass(1, 2, 3);
    expect(array.getAll()).toEqual([1, 2, 3]);
  });

  test('push', () => {
    const array = new ArrayClass();
    array.push(1);
    expect(array.getAll()).toEqual([1]);
  });

  test('push empty', () => {
    const array = new ArrayClass();
    array.push();
    expect(array.getAll()).toEqual([]);
  });

  test('push multiple', () => {
    const array = new ArrayClass();
    array.push(1, 2, 3);
    expect(array.getAll()).toEqual([1, 2, 3]);
  });

  test('pop', () => {
    const array = new ArrayClass(1, 2, 3);
    expect(array.pop()).toBe(3);
    expect(array.getAll()).toEqual([1, 2]);
  });

  test('pop empty', () => {
    const array = new ArrayClass();
    expect(array.pop()).toBe(undefined);
    expect(array.getAll()).toEqual([]);
  });

  test('get', () => {
    const array = new ArrayClass(1, 2, 3);
    expect(array.get(0)).toBe(1);
    expect(array.get(1)).toBe(2);
    expect(array.get(2)).toBe(3);
  });

  test('get out of bounds', () => {
    const array = new ArrayClass(1, 2, 3);
    expect(array.get(3)).toBe(undefined);
    expect(array.get(-1)).toBe(undefined);
  });

  test('getAll', () => {
    const array = new ArrayClass(1, 2, 3);
    expect(array.getAll()).toEqual([1, 2, 3]);
  });

  test('shift', () => {
    const array = new ArrayClass(1, 2, 3);
    expect(array.shift()).toBe(1);
    expect(array.getAll()).toEqual([2, 3]);
  });

  test('shift empty', () => {
    const array = new ArrayClass();
    expect(array.shift()).toBe(undefined);
    expect(array.getAll()).toEqual([]);
  });

  test('unshift', () => {
    const array = new ArrayClass();
    array.unshift(1);
    expect(array.getAll()).toEqual([1]);
  });

  test('unshift empty', () => {
    const array = new ArrayClass();
    array.unshift();
    expect(array.getAll()).toEqual([]);
  });

  test('unshift multiple', () => {
    const array = new ArrayClass();
    array.unshift(1, 2, 3);
    expect(array.getAll()).toEqual([1, 2, 3]);
  });
});
