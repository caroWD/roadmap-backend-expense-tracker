export class ExpenseDtoDescription {
  value: string

  constructor(value: string) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value.trim().length === 0) {
      throw new Error('ExpenseDescription cannot be empty')
    }

    if (this.value.length < 2) {
      throw new Error('ExpenseDescription must be at least 2 characters long')
    }

    if (this.value.length > 50) {
      throw new Error('ExpenseDescription cannot exceed 50 characters')
    }
  }
}
