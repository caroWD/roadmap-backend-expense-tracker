import type { Category } from '../../domain/Category.js'
import type { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository.js'
import { CategoryId } from '../../domain/object_values/index.js'
import { CategoryNotFoundError } from '../../domain/errors/index.js'

export class CategoryGetById {
  private readonly _categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository
  }

  async Run(id: number): Promise<Category> {
    const category: Category | null = await this._categoryRepository.GetById(new CategoryId(id))

    if (category === null) {
      throw new CategoryNotFoundError(`Category with id ${id} not found`)
    }

    return category
  }
}
