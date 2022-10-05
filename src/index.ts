import App from "./App/index.js"
import Project from "./models/Project.js"
import { FormDataUtils } from "./shared/form-data-utils/index.js"
import ProjectInput from "./views/ProjectInput/index.js"
import ProjectList from "./views/ProjectList/index.js"
import SingleProject from "./views/SingleProject/index.js"

const app = new App()
const projects = []
const createProject = (formData: FormData) => {
  const { title, description, people } = FormDataUtils.toObject(formData)
  projects.push(
    new Project(
      title.toString(),
      description.toString(),
      parseInt(people.toString())
    )
  )
}
const projectInput = new ProjectInput()
projectInput.subscribe(createProject)
const singleProject = new SingleProject()
const projectList = new ProjectList(singleProject)
app.render(projectInput, projectList)
