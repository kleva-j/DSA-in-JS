type BaseType = string | number;
type CompareFunction<T extends BaseType> = (a: T, b: T) => number;

export default class Comparator<T extends BaseType> {
  private compareFn: CompareFunction<T>;
  /**
   * Constructor.
   * @param {CompareFunction} [compareFunction] - It may be custom compare function that, let's say may compare custom objects together.
   */
  /**
   * Constructs a new instance of the class with a custom compare function.
   */
  constructor(compareFunction?: CompareFunction<T>) {
    if (compareFunction) {
      this.compareFn = compareFunction;
    } else {
      this.compareFn = Comparator.defaultCompareFunction as CompareFunction<T>;
    }
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   */
  static defaultCompareFunction<T extends BaseType>(a: T, b: T): number {
    if (
      (typeof a !== 'string' && typeof a !== 'number') ||
      (typeof b !== 'string' && typeof b !== 'number')
    ) {
      throw new TypeError('Comparator can only compare strings or numbers by default');
    }
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  /**
   * Checks if two variables are equal.
   */
  equal(a: T, b: T): boolean {
    return this.compareFn(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   */
  lessThan(a: T, b: T): boolean {
    return this.compareFn(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   */
  greaterThan(a: T, b: T): boolean {
    return this.compareFn(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   */
  lessThanOrEqual(a: T, b: T): boolean {
    return this.compareFn(a, b) <= 0;
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   */
  greaterThanOrEqual(a: T, b: T): boolean {
    return this.compareFn(a, b) >= 0;
  }

  /**
   * Reverses the comparison order.
   */
  reverse(): void {
    const compareOriginal = this.compareFn;
    this.compareFn = (a: T, b: T) => compareOriginal(b, a);
  }
}
