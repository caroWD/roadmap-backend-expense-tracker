import { Category } from '../domain/Category.js'
import type { ICategoryRepository } from '../domain/interfaces/ICategoryRepository.js'
import {
  CategoryCreatedAt,
  CategoryDescription,
  CategoryId,
  CategoryName,
} from '../domain/object_values/index.js'
import { ServiceContainer } from '../../shared/infrastructure/ServiceContainer.js'
import { type TCategory, categorySchema } from './schemas/CategorySchema.js'
import { CategoryIdNotFoundError } from '../domain/errors/index.js'

export class FileSystemCategoryRepository implements ICategoryRepository {
  private readonly _fileSystem = ServiceContainer.fileSystem.categories

  async Add(category: Category): Promise<void> {
    const categories: Category[] = await this.ReadFile()

    const lastCategory: Category | undefined = categories.pop()

    const lastCategoryId: number = lastCategory ? lastCategory.id.value : 0

    category.id = new CategoryId(lastCategoryId + 1)

    categories.push(category)

    const isAdded: boolean = await this._fileSystem.WriteFile(JSON.stringify(categories))

    if (!isAdded) throw new Error('Category could not be added')
  }

  async Update(category: Category): Promise<void> {
    const categories: Category[] = await this.ReadFile()

    const index: number = categories.findIndex((c) => c.id.value === category.id.value)

    if (index === -1) throw new CategoryIdNotFoundError('Category ID not found')

    categories[index] = category

    const isUpdated: boolean = await this._fileSystem.WriteFile(JSON.stringify(categories))

    if (!isUpdated) throw new Error('Category could not be updated')
  }

  async Delete(id: CategoryId): Promise<void> {
    const categories: Category[] = await this.ReadFile()

    const index: number = categories.findIndex((category) => category.id.value === id.value)

    if (index === -1) throw new CategoryIdNotFoundError('Category ID not found')

    const categoriesFiltered: Category[] = categories.filter(
      (category) => category.id.value !== id.value,
    )

    const isDeleted: boolean = await this._fileSystem.WriteFile(JSON.stringify(categoriesFiltered))

    if (!isDeleted) throw new Error('Category could not be deleted')
  }

  async GetAll(): Promise<Category[]> {
    return this.ReadFile()
  }

  async GetById(id: CategoryId): Promise<Category | null> {
    const categories: Category[] = await this.ReadFile()

    return categories.find((category) => category.id.value === id.value) || null
  }

  async GetByName(name: CategoryName): Promise<Category | null> {
    const categories: Category[] = await this.ReadFile()

    return categories.find((category) => category.name.value === name.value) || null
  }

  private async ReadFile(): Promise<Category[]> {
    const data: string = await this._fileSystem.ReadFile()

    const categoriesToFile: TCategory[] = (await categorySchema
      .array()
      .parseAsync(JSON.parse(data))) as TCategory[]

    return categoriesToFile.map(
      (category) =>
        new Category(
          new CategoryId(category.id),
          new CategoryName(category.name),
          new CategoryDescription(category.description as string),
          new CategoryCreatedAt(category.createdAt),
        ),
    )
  }
}
