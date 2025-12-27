export class BudgetDtoId {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid(): void {
    if (this.value <= 0) {
      throw new Error('BudgetId must be a positive integer')
    }

    if (!Number.isInteger(this.value)) {
      throw new Error('BudgetId must be an integer')
    }
  }
}
