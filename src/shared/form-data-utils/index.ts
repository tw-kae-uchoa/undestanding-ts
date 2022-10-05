export class FormDataUtils {
  static toObject(formData: FormData) {
    return Object.fromEntries(Array.from(formData))
  }
}
