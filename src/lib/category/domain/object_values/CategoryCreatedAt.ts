export class CategoryCreatedAt {
  value: Date

  constructor(value: Date) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
      throw new Error('Invalid date value for CategoryCreatedAt')
    }

    if (this.value > new Date()) {
      throw new Error('CategoryCreatedAt cannot be in the future')
    }
  }
}
