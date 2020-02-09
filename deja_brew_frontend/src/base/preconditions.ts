export class Preconditions {
  static checkExists<T>(o: T | null | undefined): T {
    if (o == null) {
      throw new Error('expected value');
    }
    return o;
  }
}

export class UnreachableError extends Error {
  constructor(x: never) {
    super('unreachable case: ' + x);
  }
}
