export function bind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalFn = descriptor.value
  const decoratedDescriptor = {
    configurable: true,
    get() {
      const bindFn = originalFn.bind(this)
      return bindFn
    },
  }

  return decoratedDescriptor
}
