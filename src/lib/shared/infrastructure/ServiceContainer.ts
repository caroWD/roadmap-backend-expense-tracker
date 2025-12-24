import { CategoryAdd } from '../../category/application/category_add/CategoryAdd.js'
import { CategoryDelete } from '../../category/application/category_delete/CategoryDelete.js'
import { CategoryGetAll } from '../../category/application/category_get_all/CategoryGetAll.js'
import { CategoryGetById } from '../../category/application/category_get_by_id/CategoryGetById.js'
import { CategoryGetByName } from '../../category/application/category_get_by_name/CategoryGetByName.js'
import { CategoryUpdate } from '../../category/application/category_update/CategoryUpdate.js'
import type { ICategoryRepository } from '../../category/domain/interfaces/ICategoryRepository.js'
import { FileSystemCategoryRepository } from '../../category/infrastructure/FileSystemCategoryRepository.js'
import { ExpenseAdd } from '../../expense/application/expense_add/ExpenseAdd.js'
import { ExpenseDelete } from '../../expense/application/expense_delete/ExpenseDelete.js'
import { ExpenseGetAll } from '../../expense/application/expense_get_all/ExpenseGetAll.js'
import { ExpenseGetByCategory } from '../../expense/application/expense_get_by_category/ExpenseGetByCategory.js'
import { ExpenseGetSummary } from '../../expense/application/expense_get_summary/ExpenseGetSummary.js'
import { ExpenseGetSummaryByMonth } from '../../expense/application/expense_get_summary_by_month/ExpenseGetSummaryByMonth.js'
import { ExpenseUpdate } from '../../expense/application/expense_update/ExpenseUpdate.js'
import type { IExpenseRepository } from '../../expense/domain/interfaces/IExpenseRepository.js'
import { FileSystemExpenseRepository } from '../../expense/infrastructure/FileSystemExpenseRepository.js'
import { FileSystem } from '../../file_system/infrastructure/FileSystem.js'

const categoryRepository: ICategoryRepository = new FileSystemCategoryRepository()
const expenseRepository: IExpenseRepository = new FileSystemExpenseRepository()

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
  expense: {
    add: new ExpenseAdd(expenseRepository, categoryRepository),
    update: new ExpenseUpdate(expenseRepository, categoryRepository),
    delete: new ExpenseDelete(expenseRepository, categoryRepository),
    getAll: new ExpenseGetAll(expenseRepository, categoryRepository),
    getByCategory: new ExpenseGetByCategory(expenseRepository, categoryRepository),
    getSummary: new ExpenseGetSummary(expenseRepository),
    getSummaryByMonth: new ExpenseGetSummaryByMonth(expenseRepository),
  },
}
