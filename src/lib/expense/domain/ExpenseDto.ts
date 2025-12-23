import {
  ExpenseDtoId,
  ExpenseDtoDescription,
  ExpenseDtoAmount,
  ExpenseDtoCategoryName,
  ExpenseDtoCreatedAt,
} from './object_values/index.js'

export class ExpenseDto {
  id: ExpenseDtoId
  description: ExpenseDtoDescription
  amount: ExpenseDtoAmount
  categoryName: ExpenseDtoCategoryName
  createdAt: ExpenseDtoCreatedAt

  constructor(
    id: ExpenseDtoId,
    description: ExpenseDtoDescription,
    amount: ExpenseDtoAmount,
    categoryName: ExpenseDtoCategoryName,
    createdAt: ExpenseDtoCreatedAt,
  ) {
    this.id = id
    this.description = description
    this.amount = amount
    this.categoryName = categoryName
    this.createdAt = createdAt
  }
}
