import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'
import { ExpenseDtoMonth } from '../../domain/object_values/ExpenseDtoMonth.js'

export class ExpenseGetSummaryByMonth {
  private readonly _expenseRepository: IExpenseRepository

  constructor(expenseRepository: IExpenseRepository) {
    this._expenseRepository = expenseRepository
  }

  async Run(month: number): Promise<number> {
    return (await this._expenseRepository.GetSummaryByMonth(new ExpenseDtoMonth(month))) ?? 0
  }
}
