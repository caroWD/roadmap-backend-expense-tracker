import type { Category } from '../../domain/Category.js'
import type { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository.js'
import { CategoryName } from '../../domain/object_values/index.js'
import { CategoryNotFoundError } from '../../domain/errors/index.js'

export class CategoryGetByName {
  private readonly _categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository
  }

  async Run(name: string): Promise<Category> {
    const category: Category | null = await this._categoryRepository.GetByName(
      new CategoryName(name),
    )

    if (category === null) {
      throw new CategoryNotFoundError(`Category with name ${name} not found`)
    }

    return category
  }
}
