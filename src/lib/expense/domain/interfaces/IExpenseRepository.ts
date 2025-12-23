import type { Expense } from '../Expense.js'
import type { ExpenseCategoryId, ExpenseDtoMonth, ExpenseId } from '../object_values/index.js'

export interface IExpenseRepository {
  Add(expense: Expense): Promise<Expense | null>

  Update(expense: Expense): Promise<Expense | null>

  Delete(id: ExpenseId): Promise<Expense | null>

  GetAll(): Promise<Expense[]>

  GetByCategory(categoryId: ExpenseCategoryId): Promise<Expense[]>

  GetById(id: ExpenseId): Promise<Expense | null>

  GetSummary(): Promise<number | null>

  GetSummaryByMonth(month: ExpenseDtoMonth): Promise<number | null>
}
