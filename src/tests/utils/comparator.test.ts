import { describe, expect, test } from 'vitest';

import Comparator from '../../utils/comparator';

describe('Comparator', () => {
  const comparator = new Comparator();

  test('equal', () => {
    expect(comparator.equal(1, 2)).toBe(false);
    expect(comparator.equal(1, 1)).toBe(true);
    expect(comparator.equal('a', 'b')).toBe(false);
    expect(comparator.equal('a', 'a')).toBe(true);
    expect(comparator.equal('a', 1)).toBe(false);
    expect(comparator.equal(1, 'a')).toBe(false);
  });

  test('lessThan', () => {
    expect(comparator.lessThan(1, 2)).toBe(true);
    expect(comparator.lessThan(2, 1)).toBe(false);
    expect(comparator.lessThan('a', 'b')).toBe(true);
    expect(comparator.lessThan('b', 'a')).toBe(false);
    expect(comparator.lessThan('a', 'a')).toBe(false);
    expect(comparator.lessThan('a', 1)).toBe(false);
    expect(comparator.lessThan(1, 'a')).toBe(false);
  });

  test('greaterThan', () => {
    expect(comparator.greaterThan(1, 2)).toBe(false);
    expect(comparator.greaterThan(2, 1)).toBe(true);
  });

  test('lessThanOrEqual', () => {
    expect(comparator.lessThanOrEqual(1, 2)).toBe(true);
    expect(comparator.lessThanOrEqual(2, 1)).toBe(false);
  });

  test('greaterThanOrEqual', () => {
    expect(comparator.greaterThanOrEqual(1, 2)).toBe(false);
    expect(comparator.greaterThanOrEqual(2, 1)).toBe(true);
  });

  test('reverse', () => {
    comparator.reverse();
    expect(comparator.lessThan(1, 2)).toBe(false);
    expect(comparator.lessThan(2, 1)).toBe(true);
  });
});
