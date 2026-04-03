// todo return type
interface Strategy {
  execute(
    length: number,
    history: Array<K | undefined>,
    key: K,
  ): Array<string | undefined>;
}

export class ConcreteStrategyLRU implements Strategy {
  execute(length: number, history: Array<K | undefined>, key: string) {
    const h: Array<string | undefined> = history;
    for (let i = 0; i < length; i++) {
      if (h[i] === key) {
        const temp = h[0];
        h[0] = h[i];
        h[i] = temp;
      }
    }

    return h;
  }
}

export class ConcreteStrategyNormal implements Strategy {
  execute(
    length: number,
    history: Array<K | undefined>,
    key: K,
  ): Array<string | undefined> {
    return history;
  }
}

export class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public set Strategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public executeStrategy(
    length: number,
    history: Array<K | undefined>,
    key: K,
  ) {
    return this.strategy.execute(length, history, key);
  }
}

export function getLRUStrategy(): Context {
  const lru: ConcreteStrategyLRU = new ConcreteStrategyLRU();
  const context: Context = new Context(lru);
  return context;
}

export function getNormalStrategy(): Context {
  const lru: ConcreteStrategyNormal = new ConcreteStrategyNormal();
  const context: Context = new Context(lru);
  return context;
}
