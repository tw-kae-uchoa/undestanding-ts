import { Rendable } from "../interfaces/ui/index.js"

export default class App {
  hostElement: HTMLDivElement

  constructor() {
    this.hostElement = document.getElementById("app")! as HTMLDivElement
  }

  render(...args: Rendable[]) {
    for (const arg of args) {
      this.hostElement.appendChild(arg.render())
    }
  }
}
