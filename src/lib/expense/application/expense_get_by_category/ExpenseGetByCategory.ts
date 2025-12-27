import type { Category } from '../../../category/domain/Category.js'
import { CategoryNotFoundError } from '../../../category/domain/errors/CategoryNotFoundError.js'
import type { ICategoryRepository } from '../../../category/domain/interfaces/ICategoryRepository.js'
import { CategoryId, CategoryName } from '../../../category/domain/object_values/index.js'
import { ExpenseNotFoundError } from '../../domain/errors/ExpenseNotFoundError.js'
import type { Expense } from '../../domain/Expense.js'
import { ExpenseDto } from '../../domain/ExpenseDto.js'
import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'
import { ExpenseCategoryId } from '../../domain/object_values/ExpenseCategoryId.js'
import {
  ExpenseDtoAmount,
  ExpenseDtoCategoryName,
  ExpenseDtoCreatedAt,
  ExpenseDtoDescription,
  ExpenseDtoId,
} from '../../domain/object_values/index.js'

export class ExpenseGetByCategory {
  private readonly _expenseRepository: IExpenseRepository
  private readonly _categoryRepository: ICategoryRepository

  constructor(expenseRepository: IExpenseRepository, categoryRepository: ICategoryRepository) {
    this._expenseRepository = expenseRepository
    this._categoryRepository = categoryRepository
  }

  async Run(categoryName: string): Promise<ExpenseDto[]> {
    const category: Category | null = await this._categoryRepository.GetByName(
      new CategoryName(categoryName),
    )

    if (!category) throw new CategoryNotFoundError('Category not found for deleted expense')

    const expenses: Expense[] = await this._expenseRepository.GetByCategory(
      new ExpenseCategoryId(category.id.value),
    )

    if (!expenses.length) throw new ExpenseNotFoundError('Expenses not found')

    return await Promise.all(
      expenses.map(async (expense) => {
        const category: Category | null = await this._categoryRepository.GetById(
          new CategoryId(expense.id.value),
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
