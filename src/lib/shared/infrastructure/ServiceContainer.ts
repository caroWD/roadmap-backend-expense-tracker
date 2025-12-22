import { CategoryAdd } from '../../category/application/category_add/CategoryAdd.js'
import { CategoryDelete } from '../../category/application/category_delete/CategoryDelete.js'
import { CategoryGetAll } from '../../category/application/category_get_all/CategoryGetAll.js'
import { CategoryGetById } from '../../category/application/category_get_by_id/CategoryGetById.js'
import { CategoryGetByName } from '../../category/application/category_get_by_name/CategoryGetByName.js'
import { CategoryUpdate } from '../../category/application/category_update/CategoryUpdate.js'
import type { ICategoryRepository } from '../../category/domain/interfaces/ICategoryRepository.js'
import { FileSystemCategoryRepository } from '../../category/infrastructure/FileSystemCategoryRepository.js'
import { FileSystem } from '../../file_system/infrastructure/FileSystem.js'

const categoryRepository: ICategoryRepository = new FileSystemCategoryRepository()

export const ServiceContainer = {
  fileSystem: {
    categories: new FileSystem('category', 'json', '../../../repository/fs'),
    expenses: new FileSystem('expenses', 'json', '../../../repository/fs'),
    budgets: new FileSystem('budgets', 'json', '../../../repository/fs'),
  },
  category: {
    add: new CategoryAdd(categoryRepository),
    update: new CategoryUpdate(categoryRepository),
    delete: new CategoryDelete(categoryRepository),
    getAll: new CategoryGetAll(categoryRepository),
    getById: new CategoryGetById(categoryRepository),
    getByName: new CategoryGetByName(categoryRepository),
  },
}
