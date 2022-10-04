import { bind } from "../../decorators/bind.js"
import { Rendable } from "../../interfaces/ui/index.js"
import { TemplateParser } from "../../shared/ui/index.js"
import { ValidatableField, Validation } from "../../shared/validation/index.js"

export default class ProjectInput implements Rendable {
  readonly STYLE_ID = "user-input"
  formElement: HTMLFormElement
  titleInput?: ValidatableField<HTMLInputElement>
  descriptionInput?: ValidatableField<HTMLTextAreaElement>Í
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
