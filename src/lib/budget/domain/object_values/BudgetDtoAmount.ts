export class BudgetDtoAmount {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid(): void {
    if (this.value < 0) {
      throw new Error('BudgetAmount cannot be negative')
    }
  }
}
