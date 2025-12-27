import { ExpenseDto } from '../../domain/ExpenseDto.js'
import {
  ExpenseAmount,
  ExpenseCategoryId,
  ExpenseCreatedAt,
  ExpenseDescription,
  ExpenseDtoAmount,
  ExpenseDtoCategoryName,
  ExpenseDtoCreatedAt,
  ExpenseDtoDescription,
  ExpenseDtoId,
  ExpenseId,
} from '../../domain/object_values/index.js'
import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'
import type { ICategoryRepository } from '../../../category/domain/interfaces/ICategoryRepository.js'
import { CategoryName } from '../../../category/domain/object_values/CategoryName.js'
import type { Category } from '../../../category/domain/Category.js'
import { Expense } from '../../domain/Expense.js'
import { CategoryNotFoundError } from '../../../category/domain/errors/CategoryNotFoundError.js'

export class ExpenseAdd {
  private readonly _expenseRepository: IExpenseRepository
  private readonly _categoryRepository: ICategoryRepository

  constructor(expenseRepository: IExpenseRepository, categoryRepository: ICategoryRepository) {
    this._expenseRepository = expenseRepository
    this._categoryRepository = categoryRepository
  }

  async Run(
    id: number,
    description: string,
    amount: number,
    categoryName: string,
    createdAt: string,
  ): Promise<ExpenseDto> {
    const expenseDto: ExpenseDto = new ExpenseDto(
      new ExpenseDtoId(id),
      new ExpenseDtoDescription(description),
      new ExpenseDtoAmount(amount),
      new ExpenseDtoCategoryName(categoryName),
      new ExpenseDtoCreatedAt(createdAt),
    )

    const categoryExists: Category | null = await this._categoryRepository.GetByName(
      new CategoryName(expenseDto.categoryName.value),
    )

    if (!categoryExists) throw new CategoryNotFoundError('Category does not exist')

    const expenseAdded: Expense | null = await this._expenseRepository.Add(
      new Expense(
        new ExpenseId(expenseDto.id.value),
        new ExpenseDescription(expenseDto.description.value),
        new ExpenseAmount(expenseDto.amount.value),
        new ExpenseCategoryId(categoryExists.id.value),
        new ExpenseCreatedAt(new Date(expenseDto.createdAt.value)),
      ),
    )

    if (!expenseAdded) throw new Error('Error adding expense')

    return new ExpenseDto(
      new ExpenseDtoId(expenseAdded.id.value),
      new ExpenseDtoDescription(expenseAdded.description.value),
      new ExpenseDtoAmount(expenseAdded.amount.value),
      new ExpenseDtoCategoryName(categoryExists.name.value),
      new ExpenseDtoCreatedAt(expenseAdded.createdAt.value.toLocaleDateString('en-CA')),
    )
  }
}
