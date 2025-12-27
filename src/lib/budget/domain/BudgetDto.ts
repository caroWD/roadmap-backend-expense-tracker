import {
  BudgetDtoId,
  BudgetDtoAmount,
  BudgetDtoState,
  BudgetDtoCreatedAt,
} from './object_values/index.js'

export class BudgetDto {
  id: BudgetDtoId
  amount: BudgetDtoAmount
  state: BudgetDtoState
  createdAt: BudgetDtoCreatedAt

  constructor(
    id: BudgetDtoId,
    amount: BudgetDtoAmount,
    state: BudgetDtoState,
    createdAt: BudgetDtoCreatedAt,
  ) {
    this.id = id
    this.amount = amount
    this.state = state
    this.createdAt = createdAt
  }
}
