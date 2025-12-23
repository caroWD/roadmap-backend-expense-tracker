import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'

export class ExpenseGetSummary {
  private readonly _expenseRepository: IExpenseRepository

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository
  }

  async Run(): Promise<number> {
    return (await this._expenseRepository.GetSummary()) ?? 0
  }
}
