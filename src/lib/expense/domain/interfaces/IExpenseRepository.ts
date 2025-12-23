import type { ExpenseDto } from '../ExpenseDto.js'
import type { ExpenseCategoryId, ExpenseDtoId, ExpenseDtoMonth } from '../object_values/index.js'

export interface IExpenseRepository {
  Add(expense: ExpenseDto): Promise<ExpenseDto | null>

  Update(expense: ExpenseDto): Promise<ExpenseDto | null>

  Delete(id: ExpenseDtoId): Promise<ExpenseDto | null>

  GetAll(): Promise<ExpenseDto[]>

  GetByCategory(categoryId: ExpenseCategoryId): Promise<ExpenseDto[]>

  GetById(id: ExpenseDtoId): Promise<ExpenseDto | null>

  GetSummary(): Promise<number | null>

  GetSummaryByMonth(month: ExpenseDtoMonth): Promise<number | null>
}
