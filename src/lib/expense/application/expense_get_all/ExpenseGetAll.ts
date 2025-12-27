import type { Category } from '../../../category/domain/Category.js'
import { CategoryNotFoundError } from '../../../category/domain/errors/CategoryNotFoundError.js'
import type { ICategoryRepository } from '../../../category/domain/interfaces/ICategoryRepository.js'
import { CategoryId } from '../../../category/domain/object_values/CategoryId.js'
import { ExpenseNotFoundError } from '../../domain/errors/ExpenseNotFoundError.js'
import type { Expense } from '../../domain/Expense.js'
import { ExpenseDto } from '../../domain/ExpenseDto.js'
import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'
import {
  ExpenseDtoAmount,
  ExpenseDtoCategoryName,
  ExpenseDtoCreatedAt,
  ExpenseDtoDescription,
  ExpenseDtoId,
} from '../../domain/object_values/index.js'

export class ExpenseGetAll {
  private readonly _expenseRepository: IExpenseRepository
  private readonly _categoryRepository: ICategoryRepository

  constructor(expenseRepository: IExpenseRepository, categoryRepository: ICategoryRepository) {
    this._expenseRepository = expenseRepository
    this._categoryRepository = categoryRepository
  }

  async Run(): Promise<ExpenseDto[]> {
    const expenses: Expense[] = await this._expenseRepository.GetAll()

    if (!expenses.length) throw new ExpenseNotFoundError('Expenses not found')

    return await Promise.all(
      expenses.map(async (expense) => {
        const category: Category | null = await this._categoryRepository.GetById(
          new CategoryId(expense.categoryId.value),
        )

        if (!category) throw new CategoryNotFoundError('Category not found for deleted expense')

        return new ExpenseDto(
          new ExpenseDtoId(expense.id.value),
          new ExpenseDtoDescription(expense.description.value),
          new ExpenseDtoAmount(expense.amount.value),
          new ExpenseDtoCategoryName(category.name.value),
          new ExpenseDtoCreatedAt(expense.createdAt.value.toLocaleDateString('en-CA')),
        )
      }),
    )
  }
}
