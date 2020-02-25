type ValueType =
    | string
    | boolean
    | number
    | null
    | undefined
    | readonly string[];

export class UrlBuilder {
  private readonly params = new Map<string, string | string[]>();

  constructor(
      private readonly path: string,
  ) {
  }

  static forPath(path: string, params?: { [k: string]: ValueType }): UrlBuilder {
    return new UrlBuilder(path).withParams(params);
  }

  withParams(params?: { [k: string]: ValueType }) {
    if (params) {
      Object.entries(params)
          .forEach(([name, value]) => this.withParam(name, value));
    }
    return this;
  }

  withParam(name: string, value: ValueType): this {
    if (value == null) {
      return this;
    }

    if (typeof value === 'boolean') {
      this.params.set(name, '');
    } else if (typeof value === 'number') {
      this.params.set(name, String(value));
    } else if (typeof value === 'string') {
      this.params.set(name, value);
    } else if (Array.isArray(value)) {
      this.params.set(name, value);
    } else {
      throw new Error('Unknown parameter type: ' + typeof value);
    }

    return this;
  }

  build() {
    const paramSet = Array.from(this.params.entries())
        .reduce<[string, string][]>((entries, [param, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => entries.push([param, v]));
          } else {
            entries.push([param, value]);
          }
          return entries;
        }, [])
        .map(([param, value]) => {
          return `${encodeURIComponent(param)}=${encodeURIComponent(value)}`;
        });
    const qs = paramSet.length > 0
        ? '?' + paramSet.join('&')
        : '';
    return `${this.path}${qs}`;
  }
}
