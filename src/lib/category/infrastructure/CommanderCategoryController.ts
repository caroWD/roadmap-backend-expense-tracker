import { ZodError } from 'zod'
import {
  categoryNameSchema,
  categoryDescriptionSchema,
  categoryIdSchema,
} from './schemas/CategorySchema.js'
import { ServiceContainer } from '../../shared/infrastructure/ServiceContainer.js'
import type { Category } from '../domain/Category.js'
import { CategoryDto } from '../domain/CategoryDto.js'
import { CategoryDtoId } from '../domain/object_values/CategoryDtoId.js'
import { CategoryDtoName } from '../domain/object_values/CategoryDtoName.js'
import { CategoryDtoDescription } from '../domain/object_values/CategoryDtoDescription.js'
import { CategoryDtoCreatedAt } from '../domain/object_values/CategoryDtoCreatedAt.js'
import type { TCategoryDto } from './schemas/CategoryDtoSchema.js'

export class CommanderCategoryController {
  async Add(name?: string, description?: string): Promise<void> {
    try {
      if (!name) throw new Error('Name is required')

      const nameValid: string = await categoryNameSchema.parseAsync(name)

      const descriptionValid: string | undefined =
        await categoryDescriptionSchema.parseAsync(description)

      await ServiceContainer.category.add.Run(0, nameValid, descriptionValid || '')

      const lastCategory: Category | undefined = (
        await ServiceContainer.category.getAll.Run()
      ).pop()

      console.log(`Category added successfully (ID: ${lastCategory ? lastCategory.id.value : 1})`)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  async Update(id?: string, name?: string, description?: string): Promise<void> {
    try {
      if (!id) throw new Error('ID is required')

      const idValid: number = await categoryIdSchema.parseAsync(Number(id))

      const update: Category = await ServiceContainer.category.getById.Run(idValid)

      await ServiceContainer.category.update.Run(
        idValid,
        name ? await categoryNameSchema.parseAsync(name) : update.name.value,
        description
          ? (await categoryDescriptionSchema.parseAsync(description)) || ''
          : update.description.value,
      )

      console.log(`Category updated successfully (ID: ${idValid})`)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  async Delete(id?: string): Promise<void> {
    try {
      if (!id) throw new Error('ID is required')

      const idValid: number = await categoryIdSchema.parseAsync(Number(id))

      await ServiceContainer.category.delete.Run(idValid)

      console.log('Category deleted successfully')
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  async GetAll(): Promise<void> {
    try {
      const categories: Category[] = await ServiceContainer.category.getAll.Run()

      if (!categories.length) throw new Error('No categories found')

      const categoriesMapped: CategoryDto[] = categories.map(
        (category) =>
          new CategoryDto(
            new CategoryDtoId(category.id.value),
            new CategoryDtoName(category.name.value),
            new CategoryDtoDescription(category.description.value),
            new CategoryDtoCreatedAt(category.createdAt.value.toLocaleDateString('en-CA')),
          ),
      )

      console.table(
        categoriesMapped.map<TCategoryDto>((category) => ({
          id: category.id.value,
          name: category.name.value,
          description: category.description.value,
          createdAt: category.createdAt.value,
        })),
        ['id', 'name', 'description'],
      )
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.message)
      } else if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }
}
