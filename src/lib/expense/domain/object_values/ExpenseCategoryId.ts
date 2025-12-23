export class ExpenseCategoryId {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value <= 0) {
      throw new Error('ExpenseCategoryId must be a positive integer')
    }

    if (!Number.isInteger(this.value)) {
      throw new Error('ExpenseCategoryId must be an integer')
    }
  }
}
