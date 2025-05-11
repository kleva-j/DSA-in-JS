// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayValue = number | string | boolean | null | undefined | symbol | object | Array<unknown>;

export class ArrayClass<T extends ArrayValue> {
  private length = 0;
  private data: { [index: number]: T } = {};

  constructor(...arg: T[]) {
    if (arg.length > 0) {
      this.data = arg.reduce(
        (acc, item) => {
          acc[this.length] = item;
          this.length++;
          return acc;
        },
        {} as { [index: number]: T }
      );
    }
  }

  push(...item: T[]) {
    if (item.length === 0) return;
    for (const val of item) {
      this.data[this.length] = val;
      this.length++;
    }
  }

  pop() {
    if (this.length === 0) return undefined;

    const index = this.length - 1;
    const item = this.data[index];
    delete this.data[index];
    this.length--;

    return item;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return undefined;
    return this.data[index];
  }

  getAll() {
    return Object.values(this.data);
  }

  shift() {
    if (this.length === 0) return undefined;

    const firstItem = this.data[0];

    for (let i = 0; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.length - 1];

    this.length--;

    return firstItem;
  }

  unshift(...item: T[]) {
    if (item.length === 0) return;

    for (let i = this.length + item.length - 1; i >= 0; i--) {
      this.data[i] = this.data[i - item.length];
    }

    for (let i = 0; i < item.length; i++) {
      this.data[i] = item[i];
    }

    this.length += item.length;
  }

  getLength(): number {
    return this.length;
  }

  clone(): ArrayClass<T> {
    if (this.length === 0) {
      throw new Error('Array is empty');
    }

    const newArray = new ArrayClass<T>();
    for (let i = 0; i < this.length; i++) {
      const item = this.data[i];
      if (item === undefined) {
        throw new Error(`Item at index ${i} is undefined`);
      }

      newArray.push(item);
    }

    if (newArray.length !== this.length) {
      throw new Error('Length of new array does not match old array');
    }

    return newArray;
  }
}
