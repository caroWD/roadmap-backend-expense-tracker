import { BUDGET_STATE } from '../BudgetState.enum.js'

export class BudgetDtoState {
  value: string

  constructor(value: string) {
    this.value = value
    this.EnsureIsValid()
  }

  private EnsureIsValid(): void {
    if (!Object.values(BUDGET_STATE).includes(this.value.toUpperCase()))
      throw new Error("BudgetDtoState doesn't valid")
  }
}
