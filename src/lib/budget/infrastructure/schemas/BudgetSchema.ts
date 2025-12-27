import * as z from 'zod'

export const budgetIdSchema = z.number().int().positive()

export const budgetAmountSchema = z.number().positive()

export const budgetStateSchema = z.enum({ desactived: 0, actived: 1 })

export type BudgetStateType = z.infer<typeof budgetStateSchema>

export const budgetCreatedAtSchema = z.iso.datetime()

export const budgetSchema = z.object({
  id: budgetIdSchema,
  amount: budgetAmountSchema,
  state: budgetStateSchema,
  createdAt: budgetCreatedAtSchema,
})

export type BudgetType = z.infer<typeof budgetSchema>
