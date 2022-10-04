export class ValidatableField<T> {
    field: T
    validateFn: (field: T) => boolean
  
    constructor(field: T, validateFn: (field: T) => boolean) {
      this.field = field
      this.validateFn = validateFn
    }
  
    isValid() {
      return this.validateFn(this.field)
    }
}
