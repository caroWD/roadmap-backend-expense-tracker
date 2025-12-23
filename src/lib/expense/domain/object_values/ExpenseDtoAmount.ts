export class ExpenseDtoAmount {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value < 0) {
      throw new Error('ExpenseAmount cannot be negative')
    }
  }
}
