export class CategoryDtoCreatedAt {
  value: string

  constructor(value: string) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value.trim().length === 0) {
      throw new Error('Category createdAt cannot be empty')
    }

    const dateRegex = new RegExp(/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/)

    if (!dateRegex.test(this.value)) {
      throw new Error('Category createdAt must be a valid date string in YYYY-MM-DD format')
    }
  }
}
