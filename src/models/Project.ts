export default class Project {
  title: string
  description: string
  people: number
  constructor(title: string, description: string, people: number) {
    this.title = title
    this.description = description
    this.people = people
  }
}