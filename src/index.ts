/* ###### DECORATORS #### */

function bind(_: any, __: string, descriptor: PropertyDescriptor) {
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

/* ###### DECORATORS #### */

/* ###### INTERFACES #### */

interface Rendable {
  render(): HTMLElement
}

/* ###### INTERFACES #### */

/* ###### CLASSES #### */

class TemplateParser {
  static getHTMLElement(template: HTMLTemplateElement) {
    const clone = document.importNode(template.content, true)
    return clone.firstElementChild as HTMLElement
  }
}

class ProjectInput implements Rendable {
  readonly STYLE_ID = "user-input"
  formElement: HTMLFormElement
  titleInput: HTMLInputElement
  descriptionInput: HTMLTextAreaElement
  peopleInput: HTMLInputElement

  constructor() {
    const templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement
    this.formElement = TemplateParser.getHTMLElement(
      templateElement
    ) as HTMLFormElement
    this.titleInput = this.formElement.querySelector(
      "#title"
    )! as HTMLInputElement
    this.descriptionInput = this.formElement.querySelector(
      "#description"
    )! as HTMLTextAreaElement
    this.peopleInput = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement

    this.configureSubmitListener()
  }

  @bind
  private onSubmitHandler(event: Event) {
    event.preventDefault()
    console.log(this.titleInput)
  }

  private configureSubmitListener() {
    this.formElement.addEventListener("submit", this.onSubmitHandler)
  }

  render() {
    this.formElement.id = this.STYLE_ID
    return this.formElement
  }
}

class SingleProject implements Rendable {
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

class ProjectList implements Rendable {
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

class App {
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

/* ###### CLASSES #### */

/* ###### BODY #### */

const app = new App()

const projectInput = new ProjectInput()
const singleProject = new SingleProject()
const projectList = new ProjectList(singleProject)
app.render(projectInput, projectList)

/* ###### BODY #### */
