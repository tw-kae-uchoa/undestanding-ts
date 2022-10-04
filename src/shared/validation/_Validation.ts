import { FormFields } from "../../interfaces/ui/index.js"

export class Validation {
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
