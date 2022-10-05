import App from "./App/index.js"
import ProjectInput from "./views/ProjectInput/index.js"
import ProjectList from "./views/ProjectList/index.js"
import SingleProject from "./views/SingleProject/index.js"

const app = new App()

const projectInput = new ProjectInput()
projectInput.subscribe((formData: FormData) => console.log(formData))
const singleProject = new SingleProject()
const projectList = new ProjectList(singleProject)
app.render(projectInput, projectList)
