export class BudgetCreatedAt {
  value: Date

  constructor(value: Date) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid(): void {
    if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
      throw new Error('ExpenseCreatedAt must be a valid Date')
    }

    if (this.value > new Date()) {
      throw new Error('ExpenseCreatedAt cannot be in the future')
    }
  }
}
