export class Policy {
  onGet(string: key) {}
  onSet(string: key) {}
  evictKey(): K | undefined {}
}

export function lruPolicy() {}
