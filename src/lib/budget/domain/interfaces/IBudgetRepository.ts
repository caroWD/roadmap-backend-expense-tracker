import type { Budget } from '../Budget.js'
import type { BudgetId } from '../object_values/BudgetId.js'

export interface IBudgetRepository {
  Add(budget: Budget): Promise<Budget | null>

  ChangeState(budget: Budget): Promise<Budget | null>

  GetAll(): Promise<Budget[]>

  GetById(id: BudgetId): Promise<Budget | null>
}
