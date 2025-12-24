import * as z from 'zod'

export const expenseDtoIdSchema = z.number().int().positive()

export const expenseDtoDescriptionSchema = z.string().min(2).max(50)

export const expenseDtoAmountSchema = z.number().positive()

export const expenseDtoCategoryNameSchema = z.string().min(2).max(50)

export const expenseDtoCreatedAtSchema = z.iso.date()

export const expenseDtoSchema = z.object({
  id: expenseDtoIdSchema,
  description: expenseDtoDescriptionSchema,
  amount: expenseDtoAmountSchema,
  categoryName: expenseDtoCategoryNameSchema,
  createdAt: expenseDtoCreatedAtSchema,
})

export type TExpenseDto = z.infer<typeof expenseDtoSchema>
