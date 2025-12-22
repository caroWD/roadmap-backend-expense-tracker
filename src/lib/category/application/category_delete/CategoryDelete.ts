import type { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository.js'
import { CategoryId } from '../../domain/object_values/index.js'

export class CategoryDelete {
  private readonly _categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this._categoryRepository = categoryRepository
  }

  async Run(id: number): Promise<void> {
    return await this._categoryRepository.Delete(new CategoryId(id))
  }
}
