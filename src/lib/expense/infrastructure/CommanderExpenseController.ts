import { ZodError } from 'zod'
import {
  expenseDtoCategoryNameSchema,
  expenseDtoDescriptionSchema,
  expenseDtoAmountSchema,
  expenseDtoCreatedAtSchema,
  expenseDtoIdSchema,
  type TExpenseDto,
} from './schemas/ExpenseDtoSchema.js'
import { ServiceContainer } from '../../shared/infrastructure/ServiceContainer.js'
import type { ExpenseDto } from '../domain/ExpenseDto.js'
import { expenseMonthSchema, type TExpenseMonthString } from './schemas/ExpenseMonthSchema.js'

export class CommanderExpenseController {
  async Add(description?: string, amount?: string, category?: string): Promise<void> {
    try {
      if (!description || !amount)
        throw new Error('ExpenseDescription and ExpenseAmount is required')

      const validDescription: string = await expenseDtoDescriptionSchema.parseAsync(description)

      const validAmount: number = await expenseDtoAmountSchema.parseAsync(Number(amount))

      let validCategory: string = 'others'

      if (category) {
        validCategory = await expenseDtoCategoryNameSchema.parseAsync(category)
      }

      const expenseAdded = await ServiceContainer.expense.add.Run(
        1,
        validDescription,
        validAmount,
        validCategory,
        new Date().toLocaleDateString('en-US'),
      )

      console.log(`Expense added successfully (ID: ${expenseAdded.id.value})`)
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

  async Update(
    id?: string,
    description?: string,
    amount?: string,
    category?: string,
    createdAt?: string,
  ): Promise<void> {
    try {
      if (!id) throw new Error('ExpenseId is required')

      const validId: number = await expenseDtoIdSchema.parseAsync(Number(id))

      let validDescription: string = ''

      if (description) {
        validDescription = await expenseDtoDescriptionSchema.parseAsync(description)
      }

      let validAmount: number = 0

      if (amount) {
        validAmount = await expenseDtoAmountSchema.parseAsync(Number(amount))
      }

      let validCategory: string = ''

      if (category) {
        validCategory = await expenseDtoCategoryNameSchema.parseAsync(category)
      }

      let validCreatedAt: string = ''

      if (createdAt) {
        validCreatedAt = await expenseDtoCreatedAtSchema.parseAsync(createdAt)
      }

      const expenseToUpdate: ExpenseDto = await ServiceContainer.expense.getById.Run(validId)

      const expenseUpdated: ExpenseDto = await ServiceContainer.expense.update.Run(
        validId,
        validDescription.length ? validDescription : expenseToUpdate.description.value,
        validAmount ? validAmount : expenseToUpdate.amount.value,
        validCategory.length ? validCategory : expenseToUpdate.categoryName.value,
        validCreatedAt.length ? validCreatedAt : expenseToUpdate.createdAt.value,
      )

      console.log(`Expense updated successfully (ID: ${expenseUpdated.id.value})`)
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

  async Delete(id?: string): Promise<void> {
    try {
      if (!id) throw new Error('ExpenseId is required')

      const validId: number = await expenseDtoIdSchema.parseAsync(Number(id))

      const expenseDeleted: ExpenseDto = await ServiceContainer.expense.delete.Run(validId)

      console.log(`Expense deleted successfully (ID: ${expenseDeleted.id.value})`)
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
      const expenses: ExpenseDto[] = await ServiceContainer.expense.getAll.Run()

      if (!expenses.length) {
        console.log('Expense repository is empty')

        return
      }

      const expensesMapped: TExpenseDto[] = expenses.map((expense) => ({
        id: expense.id.value,
        description: expense.description.value,
        amount: expense.amount.value,
        categoryName: expense.categoryName.value,
        createdAt: expense.createdAt.value,
      }))

      console.table(expensesMapped, ['id', 'description', 'amount', 'categoryName', 'createdAt'])
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

  async GetByCategory(category?: string): Promise<void> {
    try {
      if (!category) throw new Error('ExpenseCategory is required')

      const validCategory: string = await expenseDtoCategoryNameSchema.parseAsync(category)

      const expenses: ExpenseDto[] = await ServiceContainer.expense.getByCategory.Run(validCategory)

      if (!expenses.length) {
        console.log('Expense repository is empty')

        return
      }

      const expensesMapped: TExpenseDto[] = expenses.map((expense) => ({
        id: expense.id.value,
        description: expense.description.value,
        amount: expense.amount.value,
        categoryName: expense.categoryName.value,
        createdAt: expense.createdAt.value,
      }))

      console.table(expensesMapped, ['id', 'description', 'amount', 'categoryName', 'createdAt'])
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
      if (!id) throw new Error('ExpenseId is required')

      const validId: number = await expenseDtoIdSchema.parseAsync(id)

      const expense: ExpenseDto = await ServiceContainer.expense.getById.Run(validId)

      const expenseMapped: TExpenseDto = {
        id: expense.id.value,
        description: expense.description.value,
        amount: expense.amount.value,
        categoryName: expense.categoryName.value,
        createdAt: expense.createdAt.value,
      }

      console.table([expenseMapped], ['id', 'description', 'amount', 'categoryName', 'createdAt'])
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

  async GetSummary(): Promise<void> {
    try {
      const summary: number = await ServiceContainer.expense.getSummary.Run()

      console.log(`Total expenses: $${summary}`)
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

  async GetSummaryByMonth(month?: string): Promise<void> {
    try {
      if (!month) throw new Error('Month is required')

      const validMonth: number = await expenseMonthSchema.parseAsync(Number(month))

      const summary: number = await ServiceContainer.expense.getSummaryByMonth.Run(validMonth)

      const monthMapped: TExpenseMonthString =
        validMonth === 1
          ? 'January'
          : validMonth === 2
            ? 'February'
            : validMonth === 3
              ? 'March'
              : validMonth === 4
                ? 'April'
                : validMonth === 5
                  ? 'May'
                  : validMonth === 6
                    ? 'June'
                    : validMonth === 7
                      ? 'July'
                      : validMonth === 8
                        ? 'August'
                        : validMonth === 9
                          ? 'September'
                          : validMonth === 10
                            ? 'October'
                            : validMonth === 11
                              ? 'November'
                              : 'December'

      console.log(`Total expenses for ${monthMapped}: ${summary}`)
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
