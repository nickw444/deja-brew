import { Preconditions } from './preconditions';

export class Deserialization {
  static requiredString(o: object, key: string): string {
    return Preconditions.checkExists(Deserialization.optionalString(o, key));
  }

  static optionalString(o: object, key: string): string | undefined {
    return (o as any)[key];
  }

  static requiredBoolean(o: object, key: string): boolean {
    return Preconditions.checkExists(Deserialization.optionalBoolean(o, key));
  }

  static optionalBoolean(o: object, key: string): boolean | undefined {
    return (o as any)[key];
  }

  static requiredNumber(o: object, key: string): number {
    return Preconditions.checkExists(Deserialization.optionalNumber(o, key));
  }

  static optionalNumber(o: object, key: string): number | undefined {
    return (o as any)[key];
  }

  static requiredEnum<T>(deserializer: (value: string) => T, o: object, key: string): T {
    return Preconditions.checkExists(Deserialization.optionalEnum(deserializer, o, key));
  }

  static optionalEnum<T>(deserializer: (value: string) => T, o: object, key: string): T | undefined {
    const value = (o as any)[key];
    return value != null
        ? deserializer(value)
        : undefined;
  }

  static requiredObject<T>(deserializer: (o: object) => T, o: object, key: string): T {
    return Preconditions.checkExists(Deserialization.optionalObject(deserializer, o, key));
  }

  static optionalObject<T>(deserializer: (o: object) => T, o: object, key: string): T | undefined {
    const value = (o as any)[key];
    return value != null
        ? deserializer(value)
        : undefined;
  }

  static repeatedEnum<T>(deserializer: (value: string) => T, o: object, key: string): T[] {
    const value = (o as any)[key];
    return value != null
        ? value.map(deserializer)
        : [];
  }

  static repeatedObject<T>(deserializer: (value: string) => T, o: object, key: string): T[] {
    const value = (o as any)[key];
    return value != null
        ? value.map(deserializer)
        : [];
  }
}
