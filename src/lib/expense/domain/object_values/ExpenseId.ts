export class ExpenseId {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value <= 0) {
      throw new Error('ExpenseId must be a positive integer')
    }

    if (!Number.isInteger(this.value)) {
      throw new Error('ExpenseId must be an integer')
    }
  }
}
