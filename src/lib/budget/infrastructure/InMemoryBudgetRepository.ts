import type { Budget } from '../domain/Budget.js'
import { BUDGET_STATE } from '../domain/BudgetState.enum.js'
import type { IBudgetRepository } from '../domain/interfaces/IBudgetRepository.js'
import { BudgetId } from '../domain/object_values/BudgetId.js'
import { BudgetState } from '../domain/object_values/BudgetState.js'

export class InMemoryBudgetRepository implements IBudgetRepository {
  private budgets: Budget[] = []

  async Add(budget: Budget): Promise<Budget | null> {
    const lastBudget: Budget | undefined = this.budgets[this.budgets.length - 1]

    const lastBudgetId: number = lastBudget ? lastBudget.id.value + 1 : 1

    budget.id = new BudgetId(lastBudgetId)

    this.budgets.push(budget)

    return budget
  }

  async ChangeState(budget: Budget): Promise<Budget | null> {
    const budgetToChange: Budget | undefined = this.budgets.find(
      (b) => b.id.value === budget.id.value,
    )

    if (!budgetToChange) return null

    this.budgets = this.budgets.map((b) => {
      if (b.id.value === budget.id.value) {
        budget.state = new BudgetState(BUDGET_STATE.ACTIVED)

        return budget
      } else {
        budget.state = new BudgetState(BUDGET_STATE.DESACTIVED)

        return budget
      }
    })

    return budget
  }

  async GetAll(): Promise<Budget[]> {
    return this.budgets
  }

  async GetById(id: BudgetId): Promise<Budget | null> {
    return this.budgets.find((budget) => budget.id.value === id.value) || null
  }

  async GetActived(): Promise<Budget | null> {
    return this.budgets.find((budget) => budget.state.value === BUDGET_STATE.ACTIVED) || null
  }
}
