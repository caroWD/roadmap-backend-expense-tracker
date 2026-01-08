import type { ExpenseDto } from '../../../expense/domain/ExpenseDto.js'
import type { TExpenseDto } from '../../../expense/infrastructure/schemas/ExpenseDtoSchema.js'
import type { ICSV } from '../../domain/ICSV.js'

export class CSVExport {
  private readonly _csv: ICSV

  constructor(csv: ICSV) {
    this._csv = csv
  }

  async Run(expensesDto: ExpenseDto[]): Promise<void> {
    const expenses: TExpenseDto[] = expensesDto.map((expense) => ({
      id: expense.id.value,
      description: expense.description.value,
      amount: expense.amount.value,
      categoryName: expense.categoryName.value,
      createdAt: expense.createdAt.value,
    }))

    return await this._csv.Export(expenses)
  }
}
