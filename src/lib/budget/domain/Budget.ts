import { BudgetId, BudgetAmount, BudgetState, BudgetCreatedAt } from './object_values/index.js'

export class Budget {
  id: BudgetId
  amount: BudgetAmount
  state: BudgetState
  createdAt: BudgetCreatedAt

  constructor(id: BudgetId, amount: BudgetAmount, state: BudgetState, createdAt: BudgetCreatedAt) {
    this.id = id
    this.amount = amount
    this.state = state
    this.createdAt = createdAt
  }
}
