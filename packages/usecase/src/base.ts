export type BaseStore = { [key: string]: string | string[] | undefined };

export class WithStore {
  constructor(protected store?: BaseStore) {}

  setStore(store: BaseStore): void {
    this.store = store;
  }
}
