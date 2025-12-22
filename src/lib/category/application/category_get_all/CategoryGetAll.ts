import type { Category } from '../../domain/Category.js'
import type { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository.js'

export class CategoryGetAll {
  private readonly _categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository
  }

  async Run(): Promise<Category[]> {
    return await this._categoryRepository.GetAll()
  }
}
