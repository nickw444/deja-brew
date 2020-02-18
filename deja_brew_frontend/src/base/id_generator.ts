export const idGenerator = (prefix: string, initial: number) =>
    () => prefix + (initial++).toString();
