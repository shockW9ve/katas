interface Strategy {
  // todo args and return?
  execute();
}

class ConcreteStrategyA implements Strategy {
  execute() {}
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public set Strategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public executeStrategy() {
    this.strategy.execute();
  }
}
