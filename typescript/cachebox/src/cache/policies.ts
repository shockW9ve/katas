export class Policy {
  onGet(key: string) {}
  onSet(key: string) {}
  // evictKey(): K | undefined {}
}

export function lruPolicy(): Policy {
  return new Policy();
}
