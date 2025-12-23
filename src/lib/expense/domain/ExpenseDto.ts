export class ExpenseDto {
  id: number
  description: string
  amount: number
  categoryName: string
  createdAt: string

  constructor(
    id: number,
    description: string,
    amount: number,
    categoryName: string,
    createdAt: string,
  ) {
    this.id = id
    this.description = description
    this.amount = amount
    this.categoryName = categoryName
    this.createdAt = createdAt
  }
}
