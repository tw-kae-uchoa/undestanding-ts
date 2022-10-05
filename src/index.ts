import App from "./App/index.js"
import ProjectInput from "./View/ProjectInput/index.js"
import ProjectList from "./View/ProjectList/index.js"
import SingleProject from "./View/SingleProject/index.js"

const app = new App()

const projectInput = new ProjectInput()
projectInput.subscribe((formData: FormData) => console.log(formData))
const singleProject = new SingleProject()
const projectList = new ProjectList(singleProject)
app.render(projectInput, projectList)
