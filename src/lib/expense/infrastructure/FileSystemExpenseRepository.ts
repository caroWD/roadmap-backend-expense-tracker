import type { FileSystem } from '../../file_system/infrastructure/FileSystem.js'
import { ServiceContainer } from '../../shared/infrastructure/ServiceContainer.js'
import { Expense } from '../domain/Expense.js'
import type { IExpenseRepository } from '../domain/interfaces/IExpenseRepository.js'
import { ExpenseCategoryId } from '../domain/object_values/ExpenseCategoryId.js'
import type { ExpenseDtoMonth } from '../domain/object_values/ExpenseDtoMonth.js'
import {
  ExpenseAmount,
  ExpenseCreatedAt,
  ExpenseDescription,
  ExpenseId,
} from '../domain/object_values/index.js'
import { type TExpense, expenseSchema } from './schemas/ExpenseSchema.js'

export class FileSystemExpenseRepository implements IExpenseRepository {
  private readonly _fileSystem: FileSystem = ServiceContainer.fileSystem.expenses

  async Add(expense: Expense): Promise<Expense | null> {
    const expenses: Expense[] = await this.ReadFile()

    expenses.push(expense)

    const isWrited: boolean = await this._fileSystem.WriteFile(JSON.stringify(expenses))

    if (!isWrited) return null

    return expense
  }

  async Update(expense: Expense): Promise<Expense | null> {
    const expenses: Expense[] = await this.ReadFile()

    const index: number = expenses.findIndex((e) => e.id.value === expense.id.value)

    if (index === -1) return null

    expenses[index] = expense

    const isWrited: boolean = await this._fileSystem.WriteFile(JSON.stringify(expenses))

    if (!isWrited) return null

    return expense
  }

  async Delete(id: ExpenseId): Promise<Expense | null> {
    const expenses: Expense[] = await this.ReadFile()

    if (!expenses.length) return null

    const expenseForDelete: Expense | undefined = expenses.find((e) => e.id.value === id.value)

    if (!expenseForDelete) return null

    const expensesFiltered: Expense[] = expenses.filter(
      (e) => e.id.value === expenseForDelete.id.value,
    )

    const isWrited: boolean = await this._fileSystem.WriteFile(JSON.stringify(expensesFiltered))

    if (!isWrited) return null

    return expenseForDelete
  }

  async GetAll(): Promise<Expense[]> {
    return await this.ReadFile()
  }

  async GetByCategory(categoryId: ExpenseCategoryId): Promise<Expense[]> {
    const expenses: Expense[] = await this.ReadFile()

    return expenses.filter((e) => e.categoryId.value === categoryId.value)
  }

  async GetById(id: ExpenseId): Promise<Expense | null> {
    const expenses: Expense[] = await this.ReadFile()

    return expenses.find((e) => e.id.value === id.value) || null
  }

  async GetSummary(): Promise<number | null> {
    const expenses: Expense[] = await this.ReadFile()

    if (!expenses.length) return null

    return expenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount.value,
      0,
    )
  }

  async GetSummaryByMonth(month: ExpenseDtoMonth): Promise<number | null> {
    const expenses: Expense[] = await this.ReadFile()

    if (!expenses.length) return null

    const expensesFiltered: Expense[] = expenses.filter(
      (e) => e.createdAt.value.getMonth() + 1 === month.value,
    )

    if (!expensesFiltered.length) return null

    return expensesFiltered.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount.value,
      0,
    )
  }

  private async ReadFile(): Promise<Expense[]> {
    const data: string = await this._fileSystem.ReadFile()

    const expensesFromFile: TExpense[] = (await expenseSchema
      .array()
      .parseAsync(JSON.parse(data))) as TExpense[]

    return expensesFromFile.map(
      (expense) =>
        new Expense(
          new ExpenseId(expense.id),
          new ExpenseDescription(expense.description),
          new ExpenseAmount(expense.amount),
          new ExpenseCategoryId(expense.categoryId),
          new ExpenseCreatedAt(new Date(expense.createdAt)),
        ),
    )
  }
}
