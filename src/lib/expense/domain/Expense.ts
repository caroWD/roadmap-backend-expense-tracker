import {
  ExpenseId,
  ExpenseDescription,
  ExpenseAmount,
  ExpenseCategoryId,
  ExpenseCreatedAt,
} from './object_values/index.js'

export class Expense {
  id: ExpenseId
  description: ExpenseDescription
  amount: ExpenseAmount
  categoryId: ExpenseCategoryId
  createdAt: ExpenseCreatedAt

  constructor(
    id: ExpenseId,
    description: ExpenseDescription,
    amount: ExpenseAmount,
    categoryId: ExpenseCategoryId,
    createdAt: ExpenseCreatedAt,
  ) {
    this.id = id
    this.description = description
    this.amount = amount
    this.categoryId = categoryId
    this.createdAt = createdAt
  }
}
