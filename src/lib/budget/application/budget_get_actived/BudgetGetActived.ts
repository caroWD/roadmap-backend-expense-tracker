import type { Budget } from '../../domain/Budget.js'
import type { IBudgetRepository } from '../../domain/interfaces/IBudgetRepository.js'

export class BudgetGetActived {
  private readonly _budgetRepository: IBudgetRepository

  constructor(budgetRepository: IBudgetRepository) {
    this._budgetRepository = budgetRepository
  }

  async Run(): Promise<number> {
    const budgetActived: Budget | null = await this._budgetRepository.GetActived()

    if (!budgetActived) return 0

    return budgetActived.amount.value
  }
}
