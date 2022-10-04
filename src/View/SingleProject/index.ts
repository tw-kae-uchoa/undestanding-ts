import { Rendable } from "../../interfaces/ui/index.js"
import { TemplateParser } from "../../shared/ui/index.js"

export default class SingleProject implements Rendable {
  readonly TEMPLATE_ID = "single-project"
  templateElement: HTMLTemplateElement

  constructor() {
    this.templateElement = document.getElementById(
      this.TEMPLATE_ID
    )! as HTMLTemplateElement
  }

  render() {
    return TemplateParser.getHTMLElement(this.templateElement)
  }
}
