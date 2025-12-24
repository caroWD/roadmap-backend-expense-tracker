import type { Expense } from '../domain/Expense.js'
import type { IExpenseRepository } from '../domain/interfaces/IExpenseRepository.js'
import type { ExpenseCategoryId } from '../domain/object_values/ExpenseCategoryId.js'
import type { ExpenseDtoMonth } from '../domain/object_values/ExpenseDtoMonth.js'
import { ExpenseId } from '../domain/object_values/ExpenseId.js'

export class InMemoryExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = []

  async Add(expense: Expense): Promise<Expense | null> {
    const lastExpense: Expense | undefined = this.expenses.pop()

    const lastExpenseId: number = lastExpense ? lastExpense.id.value + 1 : 1

    expense.id = new ExpenseId(lastExpenseId)

    this.expenses.push(expense)

    return expense
  }

  async Update(expense: Expense): Promise<Expense | null> {
    const index: number = this.expenses.findIndex((e) => e.id.value === expense.id.value)

    if (index === -1) return null

    this.expenses[index] = expense

    return expense
  }

  async Delete(id: ExpenseId): Promise<Expense | null> {
    const index: number = this.expenses.findIndex((expense) => expense.id.value === id.value)

    if (index === -1) return null

    const expenseDeleted: Expense | undefined = this.expenses[index]

    if (!expenseDeleted) return null

    this.expenses = this.expenses.filter((expense) => expense.id.value !== id.value)

    return expenseDeleted
  }

  async GetAll(): Promise<Expense[]> {
    return this.expenses
  }

  async GetByCategory(categoryId: ExpenseCategoryId): Promise<Expense[]> {
    return this.expenses.filter((expense) => expense.categoryId.value !== categoryId.value)
  }

  async GetById(id: ExpenseId): Promise<Expense | null> {
    return this.expenses.find((expense) => expense.id.value === id.value) || null
  }

  async GetSummary(): Promise<number | null> {
    const amount: number = this.expenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount.value,
      0,
    )

    return amount ? amount : null
  }

  async GetSummaryByMonth(month: ExpenseDtoMonth): Promise<number | null> {
    const expensesFiltered: Expense[] = this.expenses.filter(
      (expense) => expense.createdAt.value.getMonth() + 1 === month.value,
    )

    if (!expensesFiltered.length) return null

    const amount: number = this.expenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount.value,
      0,
    )

    return amount ? amount : null
  }
}
