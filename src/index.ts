// import App from "./App"
// import { Rendable } from "./interfaces/Rendable"
// import ProjectInput from "./ProjectInput"

/* ###### INTERFACES #### */

interface Rendable {
  render(): DocumentFragment | HTMLElement
}

/* ###### INTERFACES #### */

/* ###### CLASSES #### */

class ProjectInput implements Rendable {
  readonly TEMPLATE_ID = "project-input"
  templateElement: HTMLTemplateElement

  constructor() {
    this.templateElement = document.getElementById(
      this.TEMPLATE_ID
    )! as HTMLTemplateElement
  }

  render() {
    return this.templateElement.content
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
    return this.templateElement.content
  }
}

class ProjectList implements Rendable {
  readonly TEMPLATE_ID = "project-list"
  templateElement: HTMLTemplateElement
  constructor() {
    this.templateElement = document.getElementById(this.TEMPLATE_ID)! as HTMLTemplateElement
  }

  render(){
    return this.templateElement.content
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
const projectList = new ProjectList()
app.render(projectInput, singleProject, projectList)

/* ###### BODY #### */
