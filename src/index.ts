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

type FormFields = HTMLInputElement | HTMLTextAreaElement

/* ###### CLASSES #### */

class TemplateParser {
  static getHTMLElement(template: HTMLTemplateElement) {
    const clone = document.importNode(template.content, true)
    return clone.firstElementChild as HTMLElement
  }
}

class ValidatableField<T> {
  field: T
  validateFn: (field: T) => boolean

  constructor(field: T, validateFn: (field: T) => boolean) {
    this.field = field
    this.validateFn = validateFn
  }

  isValid() {
    return this.validateFn(this.field)
  }
}

class Validation {
  static required<T extends FormFields>(field: T) {
    return field.value.length > 0
  }

  static minLength<T extends FormFields>(field: T, length: number) {
    if (field instanceof HTMLTextAreaElement) {
      return field.textLength >= length
    }
    return field.value.length >= length
  }

  static min<T extends HTMLInputElement>(field: T, min: number) {
    return parseInt(field.value) >= min
  }
}

class ProjectInput implements Rendable {
  readonly STYLE_ID = "user-input"
  formElement: HTMLFormElement
  titleInput?: ValidatableField<HTMLInputElement>
  descriptionInput?: ValidatableField<HTMLTextAreaElement>
  peopleInput?: ValidatableField<HTMLInputElement>

  private _getFormElement() {
    const templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement
    return TemplateParser.getHTMLElement(templateElement) as HTMLFormElement
  }

  private _getTitleInput() {
    if (!this.formElement) return

    const title = this.formElement.querySelector("#title")! as HTMLInputElement
    return new ValidatableField(title, (field: HTMLInputElement) =>
      Validation.required(field)
    )
  }

  private _getDescriptionInput() {
    if (!this.formElement) return

    const descriptionInput = this.formElement.querySelector(
      "#description"
    )! as HTMLTextAreaElement

    return new ValidatableField(
      descriptionInput,
      (field: HTMLTextAreaElement) => Validation.minLength(field, 5)
    )
  }

  private _getPeopleInput() {
    if (!this.formElement) return
    const peopleInput = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement
    return new ValidatableField(peopleInput, (field: HTMLInputElement) =>
      Validation.min(field, 2)
    )
  }

  constructor() {
    this.formElement = this._getFormElement()
    this.titleInput = this._getTitleInput()
    this.descriptionInput = this._getDescriptionInput()
    this.peopleInput = this._getPeopleInput()

    this.configureSubmitListener()
  }

  @bind
  private onSubmitHandler(event: Event) {
    event.preventDefault()
    if (this.titleInput && !this?.titleInput.isValid())
      alert("title input error")
    if (this.descriptionInput && !this.descriptionInput.isValid())
      alert("description input error")
    if (this.peopleInput && !this.peopleInput.isValid())
      alert("people input error")
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
