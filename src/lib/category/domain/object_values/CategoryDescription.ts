export class CategoryDescription {
  value: string

  constructor(value: string) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value.trim().length === 0) {
      this.value = 'Category without description'
    }

    if (this.value.length < 10) {
      throw new Error('Category description must be at least 22 characters long')
    }

    if (this.value.length > 255) {
      throw new Error('Category description cannot exceed 255 characters')
    }
  }
}
