import type { Category } from '../Category.js'
import type { CategoryId, CategoryName } from '../object_values/index.js'

export interface ICategoryRepository {
  Add(category: Category): Promise<void>

  Update(category: Category): Promise<void>

  Delete(id: CategoryId): Promise<void>

  GetAll(): Promise<Category[]>

  GetById(id: CategoryId): Promise<Category | null>

  GetByName(name: CategoryName): Promise<Category | null>
}
