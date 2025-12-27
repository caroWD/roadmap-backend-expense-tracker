import type { Category } from '../../../category/domain/Category.js'
import { CategoryNotFoundError } from '../../../category/domain/errors/CategoryNotFoundError.js'
import type { ICategoryRepository } from '../../../category/domain/interfaces/ICategoryRepository.js'
import { CategoryId } from '../../../category/domain/object_values/CategoryId.js'
import type { Expense } from '../../domain/Expense.js'
import { ExpenseDto } from '../../domain/ExpenseDto.js'
import type { IExpenseRepository } from '../../domain/interfaces/IExpenseRepository.js'
import { ExpenseDtoAmount } from '../../domain/object_values/ExpenseDtoAmount.js'
import { ExpenseDtoCategoryName } from '../../domain/object_values/ExpenseDtoCategoryName.js'
import { ExpenseDtoCreatedAt } from '../../domain/object_values/ExpenseDtoCreatedAt.js'
import { ExpenseDtoDescription } from '../../domain/object_values/ExpenseDtoDescription.js'
import { ExpenseDtoId } from '../../domain/object_values/ExpenseDtoId.js'
import { ExpenseId } from '../../domain/object_values/ExpenseId.js'

export class ExpenseDelete {
  private readonly _expenseRepository: IExpenseRepository
  private readonly _categoryRepository: ICategoryRepository

  constructor(expenseRepository: IExpenseRepository, categoryRepository: ICategoryRepository) {
    this._expenseRepository = expenseRepository
    this._categoryRepository = categoryRepository
  }

  async Run(id: number): Promise<ExpenseDto> {
    const expenseDtoId: ExpenseDtoId = new ExpenseDtoId(id)

    const expenseDeleted: Expense | null = await this._expenseRepository.Delete(
      new ExpenseId(expenseDtoId.value),
    )

    if (!expenseDeleted) throw new Error('Expense could not be deleted')

    const category: Category | null = await this._categoryRepository.GetById(
      new CategoryId(expenseDeleted.categoryId.value),
    )

    if (!category) throw new CategoryNotFoundError('Category not found for deleted expense')

    return new ExpenseDto(
      new ExpenseDtoId(expenseDeleted.id.value),
      new ExpenseDtoDescription(expenseDeleted.description.value),
      new ExpenseDtoAmount(expenseDeleted.amount.value),
      new ExpenseDtoCategoryName(category.name.value),
      new ExpenseDtoCreatedAt(expenseDeleted.createdAt.value.toLocaleDateString('en-CA')),
    )
  }
}
