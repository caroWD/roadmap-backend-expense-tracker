import type { Category } from '../../../category/domain/Category.js'
import type { ICategoryRepository } from '../../../category/domain/interfaces/ICategoryRepository.js'
import { CategoryId } from '../../../category/domain/object_values/CategoryId.js'
import type { Expense } from '../../domain/Expense.js'
import { ExpenseDto } from '../../domain/ExpenseDto.js'
import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'
import { ExpenseDtoId } from '../../domain/object_values/ExpenseDtoId.js'
import {
  ExpenseDtoAmount,
  ExpenseDtoCategoryName,
  ExpenseDtoCreatedAt,
  ExpenseDtoDescription,
  ExpenseId,
} from '../../domain/object_values/index.js'

export class ExpenseGetById {
  private readonly _expenseRepository: IExpenseRepository
  private readonly _categoryRepository: ICategoryRepository

  constructor(expenseRepository: IExpenseRepository, categoryRepository: ICategoryRepository) {
    this._expenseRepository = expenseRepository
    this._categoryRepository = categoryRepository
  }

  async Run(id: number): Promise<ExpenseDto> {
    const expense: Expense | null = await this._expenseRepository.GetById(new ExpenseId(id))

    if (!expense) throw new Error('ExpenseId not found')

    const category: Category | null = await this._categoryRepository.GetById(
      new CategoryId(expense.categoryId.value),
    )

    if (!category) throw new Error('Category not found for deleted expense')

    return new ExpenseDto(
      new ExpenseDtoId(expense.id.value),
      new ExpenseDtoDescription(expense.description.value),
      new ExpenseDtoAmount(expense.amount.value),
      new ExpenseDtoCategoryName(category.name.value),
      new ExpenseDtoCreatedAt(expense.createdAt.value.toLocaleDateString('en-US')),
    )
  }
}
