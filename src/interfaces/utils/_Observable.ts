export interface Observable {
  subscribe(fn: Function): void
  unSubscribe(fn: Function): void
  notify(data: any): void
}
