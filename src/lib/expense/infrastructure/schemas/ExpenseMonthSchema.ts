import * as z from 'zod'

export const expenseMonthSchema = z.number().int().positive().min(1).max(12)

export type TExpenseMonth = z.infer<typeof expenseMonthSchema>

export const expenseMonthStringSchema = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

export type TExpenseMonthString = z.infer<typeof expenseMonthStringSchema>
