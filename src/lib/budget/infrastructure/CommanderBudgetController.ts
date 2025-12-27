import { ZodError } from 'zod'
import { budgetAmountSchema, budgetIdSchema } from './schemas/BudgetSchema.js'
import { ServiceContainer } from '../../shared/infrastructure/ServiceContainer.js'
import type { BudgetDtoStateType, BudgetDtoType } from './schemas/BudgetDtoSchema.js'
import type { BudgetDto } from '../domain/BudgetDto.js'

export class CommanderBudgetController {
  async Add(amount?: string): Promise<void> {
    try {
      if (!amount) throw new Error('BudgetAmount is required')

      const validAmount: number = await budgetAmountSchema.parseAsync(amount)

      const validState: BudgetDtoStateType = 'actived'

      const budgetAdded: BudgetDto = await ServiceContainer.budget.add.Run(
        1,
        validAmount,
        validState,
        new Date().toLocaleDateString('en-CA'),
      )

      console.log(`Budget added successfully (ID: ${budgetAdded.id.value})`)
      console.log(`New budget available: ${budgetAdded.amount.value}`)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  async ChangeState(id?: number): Promise<void> {
    try {
      if (!id) throw new Error('BudgetId is required')

      const validId: number = await budgetIdSchema.parseAsync(Number(id))

      const budgetToChange: BudgetDto = await ServiceContainer.budget.getById.Run(validId)

      const budgetChanged: BudgetDto = await ServiceContainer.budget.changeState.Run(
        budgetToChange.id.value,
        budgetToChange.amount.value,
        budgetToChange.state.value,
        budgetToChange.createdAt.value,
      )

      console.log(`Budget active: ID ${budgetChanged.id.value}`)
      console.log(`New budget available: ${budgetChanged.amount.value}`)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  async GetAll(): Promise<void> {
    try {
      const budgets: BudgetDto[] = await ServiceContainer.budget.getAll.Run()

      if (!budgets.length) throw new Error('Budget repositort is empty')

      const budgetMapped: BudgetDtoType[] = budgets.map((budget) => ({
        id: budget.id.value,
        amount: budget.amount.value,
        state: budget.state.value as BudgetDtoStateType,
        createdAt: budget.createdAt.value,
      }))

      console.table(budgetMapped, ['id', 'amount', 'state', 'createdAt'])
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  async GetById(id?: string): Promise<void> {
    try {
      if (!id) throw new Error('BudgetId is required')

      const validId: number = await budgetIdSchema.parseAsync(Number(id))

      const budget: BudgetDto = await ServiceContainer.budget.getById.Run(validId)

      const budgetMapped: BudgetDtoType = {
        id: budget.id.value,
        amount: budget.amount.value,
        state: budget.state.value as BudgetDtoStateType,
        createdAt: budget.createdAt.value,
      }

      console.table([budgetMapped], ['id', 'amount', 'state', 'createdAt'])
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }
}
