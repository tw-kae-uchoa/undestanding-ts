import { bind } from "../../decorators/bind.js"
import { Rendable } from "../../interfaces/ui/index.js"
import { Observable } from "../../interfaces/utils/_Observable.js"
import { TemplateParser } from "../../shared/ui/index.js"
import { ValidatableField, Validation } from "../../shared/validation/index.js"

export default class ProjectInput implements Rendable, Observable {
  readonly STYLE_ID = "user-input"
  private _formElement: HTMLFormElement
  private _titleInput?: ValidatableField<HTMLInputElement>
  private _descriptionInput?: ValidatableField<HTMLTextAreaElement>
  private _peopleInput?: ValidatableField<HTMLInputElement>
  private _subscribers: Function[]

  constructor() {
    this._formElement = this._getFormElement()
    this._titleInput = this._getTitleInput()
    this._descriptionInput = this._getDescriptionInput()
    this._peopleInput = this._getPeopleInput()
    this._subscribers = []

    this.configureSubmitListener()
  }

  private _getFormElement() {
    const templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement
    return TemplateParser.getHTMLElement(templateElement) as HTMLFormElement
  }

  private _getTitleInput() {
    if (!this._formElement) return

    const title = this._formElement.querySelector("#title")! as HTMLInputElement
    return new ValidatableField(title, (field: HTMLInputElement) =>
      Validation.required(field)
    )
  }

  private _getDescriptionInput() {
    if (!this._formElement) return

    const descriptionInput = this._formElement.querySelector(
      "#description"
    )! as HTMLTextAreaElement

    return new ValidatableField(
      descriptionInput,
      (field: HTMLTextAreaElement) => Validation.minLength(field, 5)
    )
  }

  private _getPeopleInput() {
    if (!this._formElement) return
    const peopleInput = this._formElement.querySelector(
      "#people"
    )! as HTMLInputElement
    return new ValidatableField(peopleInput, (field: HTMLInputElement) =>
      Validation.min(field, 2)
    )
  }

  private _isFormValid() {
    let isValid = true
    if (this._titleInput && !this?._titleInput.isValid()) isValid = false
    if (this._descriptionInput && !this._descriptionInput.isValid())
      isValid = false
    if (this._peopleInput && !this._peopleInput.isValid()) isValid = false

    return isValid
  }

  private _getFormData(form: HTMLFormElement) {
    const formData = new FormData(form)    
    if (this._isFormValid()) return formData

    return null
  }

  @bind
  private onSubmitHandler(event: Event) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = this._getFormData(form)
    if (formData) {
      this.notify(formData)
    }
  }

  private configureSubmitListener() {
    this._formElement.addEventListener("submit", this.onSubmitHandler)
  }

  render() {
    this._formElement.id = this.STYLE_ID
    return this._formElement
  }

  subscribe(fn: Function) {
    this._subscribers.push(fn)
  }

  unSubscribe(fn: Function) {
    this._subscribers.filter((item: Function) => fn !== item)
  }

  notify(formData: FormData) {
    for (const sub of this._subscribers) {
      sub(Array.from(formData))
    }
  }
}
