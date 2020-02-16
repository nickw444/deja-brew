import { Preconditions } from './preconditions';

export class Serialization {

  static requiredEnum<T>(serializer: (value: T) => string, value: T): string {
    return Preconditions.checkExists(Serialization.optionalEnum(serializer, value));
  }

  static optionalEnum<T>(serializer: (value: T) => string, value: T): string | undefined {
    return value != null
        ? serializer(value)
        : undefined;
  }

  static requiredObject<T>(serializer: (o: T) => object, value: T): object {
    return Preconditions.checkExists(Serialization.optionalObject(serializer, value));
  }

  static optionalObject<T>(serializer: (o: T) => object, value: T | undefined): object | undefined {
    return value != null
        ? serializer(value)
        : undefined;
  }

  static repeatedEnum<T>(serializer: (value: T) => string, value: T[]): string[] {
    return value.map(v => serializer(v));
  }

  static repeatedObject<T>(serializer: (value: T) => object, value: T[]): object[] {
    return value.map(v => serializer(v));
  }
}
