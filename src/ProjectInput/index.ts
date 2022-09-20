import { Rendable } from "../interfaces/Rendable"

class ProjectInput implements Rendable {
    readonly TEMPLATE_ID = 'project-input'
    templateElement: HTMLTemplateElement
    
    constructor() {
        this.templateElement = document.getElementById(this.TEMPLATE_ID)! as HTMLTemplateElement
    }

    render() {
        return this.templateElement.content
    }
}

export default ProjectInput
