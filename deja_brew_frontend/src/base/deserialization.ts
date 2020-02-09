import { Preconditions } from './preconditions';

export class Deserialization {
  static requiredString(o: object, key: string): string {
    return Preconditions.checkExists((o as any)[key]);
  }

  static optionalString(o: object, key: string): string | undefined {
    return (o as any)[key];
  }

  static requiredObject<T>(deserializer: (o: object) => T, o: object, key: string): T {
    return deserializer(Preconditions.checkExists((o as any)[key]));
  }
}
