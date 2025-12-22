import { Category } from '../../domain/Category.js'
import type { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository.js'
import { CategoryId, CategoryName, CategoryDescription } from '../../domain/object_values/index.js'

export class CategoryAdd {
  private readonly _categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository
  }

  async Run(id: number, name: string, description: string): Promise<void> {
    return await this._categoryRepository.Add(
      new Category(
        new CategoryId(id),
        new CategoryName(name),
        new CategoryDescription(description),
      ),
    )
  }
}
