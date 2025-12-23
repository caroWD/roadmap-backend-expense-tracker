export class CategoryDtoName {
  value: string

  constructor(value: string) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (!this.value.trim()) {
      throw new Error('Category name cannot be empty')
    }

    if (this.value.length < 2) {
      throw new Error('Category name must be at least 2 characters long')
    }

    if (this.value.length > 50) {
      throw new Error('Category name cannot exceed 50 characters')
    }
  }
}
