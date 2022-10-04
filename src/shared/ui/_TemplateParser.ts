export class TemplateParser {
  static getHTMLElement(template: HTMLTemplateElement) {
    const clone = document.importNode(template.content, true)
    return clone.firstElementChild as HTMLElement
  }
}
