// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayValue = number | string | boolean | null | undefined | symbol | object | Array<unknown>;

export class ArrayClass<T extends ArrayValue> {
  private length = 0;
  private data: { [index: number]: T } = {};

  constructor(...arg: T[]) {
    if (arg.length > 0) {
      for (const item of arg) {
        this.data[this.length] = item;
        this.length++;
      }
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

  getAll(): T[] {
    return Array.from({ length: this.length }, (_, i) => this.data[i]);
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
    const newArray = new ArrayClass<T>();
    for (let i = 0; i < this.length; i++) {
      newArray.push(this.data[i]);
    }
    return newArray;
  }
}
