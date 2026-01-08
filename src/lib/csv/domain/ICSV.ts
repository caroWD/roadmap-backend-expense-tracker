import type { TExpenseDto } from '../../expense/infrastructure/schemas/ExpenseDtoSchema.js'

export interface ICSV {
  Export(expenses: TExpenseDto[]): Promise<void>
}
