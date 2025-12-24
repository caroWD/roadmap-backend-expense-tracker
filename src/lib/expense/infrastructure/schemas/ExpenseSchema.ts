import * as z from 'zod'

export const expenseSchema = z.object({
  id: z.number().int().positive(),
  description: z.string().min(2).max(50),
  amount: z.number().positive(),
  categoryId: z.number().int().positive(),
  createdAt: z.iso.datetime(),
})

export type TExpense = z.infer<typeof expenseSchema>
