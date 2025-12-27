import { FileSystem } from '../../file_system/infrastructure/FileSystem.js'
import { Budget } from '../domain/Budget.js'
import type { IBudgetRepository } from '../domain/interfaces/IBudgetRepository.js'
import { BudgetAmount } from '../domain/object_values/BudgetAmount.js'
import { BudgetCreatedAt } from '../domain/object_values/BudgetCreatedAt.js'
import { BudgetId } from '../domain/object_values/BudgetId.js'
import { BudgetState } from '../domain/object_values/BudgetState.js'
import { budgetSchema, type BudgetStateType, type BudgetType } from './schemas/BudgetSchema.js'

export class FileSystemBudgetRepository implements IBudgetRepository {
  private readonly _fileSystem: FileSystem

  constructor(fileName: string) {
    this._fileSystem = new FileSystem(fileName, 'json', '../../../repository/fs')
  }

  async Add(budget: Budget): Promise<Budget | null> {
    const budgets: Budget[] = await this.ReadFile()

    const lastBudget: Budget | undefined = budgets[budgets.length - 1]

    budget.id = new BudgetId(lastBudget ? lastBudget.id.value + 1 : 1)

    budgets.push(budget)

    const budgetsMapped: BudgetType[] = await Promise.all(
      budgets.map(async (b) => await this.MapToBudgetType(b)),
    )

    const isWrited: boolean = await this._fileSystem.WriteFile(JSON.stringify(budgetsMapped))

    return isWrited ? budget : null
  }

  async ChangeState(budget: Budget): Promise<Budget | null> {
    const budgets: Budget[] = await this.ReadFile()

    if (!budgets.length) return null

    const index: number = budgets.findIndex((b) => b.id.value === budget.id.value)

    if (index === -1) return null

    budgets[index] = budget

    const budgetsMapped: BudgetType[] = await Promise.all(
      budgets.map(async (b) => await this.MapToBudgetType(b)),
    )

    const isWrited: boolean = await this._fileSystem.WriteFile(JSON.stringify(budgetsMapped))

    return isWrited ? budget : null
  }

  async GetAll(): Promise<Budget[]> {
    return await this.ReadFile()
  }

  async GetById(id: BudgetId): Promise<Budget | null> {
    const budgets: Budget[] = await this.ReadFile()

    return budgets.find((budget) => budget.id.value === id.value) || null
  }

  private async ReadFile(): Promise<Budget[]> {
    const data: string = await this._fileSystem.ReadFile()

    const budgetsFromFile: BudgetType[] = (await budgetSchema
      .array()
      .parseAsync(JSON.parse(data))) as BudgetType[]

    return budgetsFromFile.map(
      (budget) =>
        new Budget(
          new BudgetId(budget.id),
          new BudgetAmount(budget.amount),
          new BudgetState(budget.state),
          new BudgetCreatedAt(new Date(budget.createdAt)),
        ),
    )
  }

  private async MapToBudgetType(budget: Budget): Promise<BudgetType> {
    return {
      id: budget.id.value,
      amount: budget.amount.value,
      state: budget.state.value as BudgetStateType,
      createdAt: budget.createdAt.value.toISOString(),
    }
  }
}
