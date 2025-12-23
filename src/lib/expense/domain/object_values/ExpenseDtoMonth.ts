export class ExpenseDtoMonth {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid() {
    if (this.value < 1 || this.value > 12) {
      throw new Error('ExpenseDtoMonth must be between 1 and 12')
    }
  }
}
