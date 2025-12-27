import * as z from 'zod'

export const budgetDtoIdSchema = z.number().int().positive()

export const budgetDtoAmountSchema = z.number().positive()

export const budgetDtoStateSchema = z.enum(['desactived', 'actived'])

export type BudgetDtoStateType = z.infer<typeof budgetDtoStateSchema>

export const budgetDtoCreatedAtSchema = z.iso.date()

export const budgetDtoSchema = z.object({
  id: budgetDtoIdSchema,
  amount: budgetDtoAmountSchema,
  state: budgetDtoStateSchema,
  createdAt: budgetDtoCreatedAtSchema,
})

export type BudgetDtoType = z.infer<typeof budgetDtoSchema>
