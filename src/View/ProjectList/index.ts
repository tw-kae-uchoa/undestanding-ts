import { Rendable } from "../../interfaces/ui/index.js"
import { TemplateParser } from "../../shared/ui/index.js"
import SingleProject from "../SingleProject/index.js"

export default class ProjectList implements Rendable {
  readonly TEMPLATE_ID = "project-list"
  templateElement: HTMLTemplateElement
  projects: SingleProject[]

  constructor(...projects: SingleProject[]) {
    this.templateElement = document.getElementById(
      this.TEMPLATE_ID
    )! as HTMLTemplateElement
    this.projects = projects
  }

  render() {
    const node = TemplateParser.getHTMLElement(this.templateElement)
    if (this.projects.length) {
      for (const project of this.projects) {
        node.appendChild(project.render())
      }
    }
    return node
  }
}
