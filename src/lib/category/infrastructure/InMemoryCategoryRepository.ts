import type { Category } from '../domain/Category.js'
import type { ICategoryRepository } from '../domain/interfaces/ICategoryRepository.js'
import type { CategoryId } from '../domain/object_values/CategoryId.js'
import type { CategoryName } from '../domain/object_values/CategoryName.js'
import { CategoryIdNotFoundError } from '../domain/errors/index.js'

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  async Add(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async Update(category: Category): Promise<void> {
    const index: number = this.categories.findIndex((c) => c.id.value === category.id.value)

    if (index === -1) {
      throw new CategoryIdNotFoundError('CategoryId not found.')
    }

    this.categories[index] = category
  }

  async Delete(id: CategoryId): Promise<void> {
    const index: number = this.categories.findIndex((c) => c.id.value === id.value)

    if (index === -1) {
      throw new CategoryIdNotFoundError('CategoryId not found.')
    }

    this.categories = this.categories.filter((category) => category.id.value !== id.value)
  }

  async GetAll(): Promise<Category[]> {
    return this.categories
  }

  async GetById(id: CategoryId): Promise<Category | null> {
    return this.categories.find((category) => category.id.value === id.value) || null
  }

  async GetByName(name: CategoryName): Promise<Category | null> {
    return this.categories.find((category) => category.name.value === name.value) || null
  }
}
