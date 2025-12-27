import { BUDGET_STATE } from '../BudgetState.enum.js'

export class BudgetState {
  value: number

  constructor(value: number) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid(): void {
    if (!Object.values(BUDGET_STATE).includes(this.value))
      throw new Error("BudgetState doesn't valid")
  }
}
