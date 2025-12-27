import { BudgetAdd } from '../../budget/application/budget_add/BudgetAdd.js'
import { BudgetChangeState } from '../../budget/application/budget_change_state/BudgetChangeState.js'
import { BudgetGetAll } from '../../budget/application/budget_get_all/BudgetGetAll.js'
import { BudgetGetById } from '../../budget/application/budget_get_by_id/BudgetGetById.js'
import type { IBudgetRepository } from '../../budget/domain/interfaces/IBudgetRepository.js'
import { FileSystemBudgetRepository } from '../../budget/infrastructure/FileSystemBudgetRepository.js'
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
import { ExpenseGetById } from '../../expense/application/expense_get_by_id/ExpenseGetById.js'
import { ExpenseGetSummary } from '../../expense/application/expense_get_summary/ExpenseGetSummary.js'
import { ExpenseGetSummaryByMonth } from '../../expense/application/expense_get_summary_by_month/ExpenseGetSummaryByMonth.js'
import { ExpenseUpdate } from '../../expense/application/expense_update/ExpenseUpdate.js'
import type { IExpenseRepository } from '../../expense/domain/interfaces/IExpenseRepository.js'
import { FileSystemExpenseRepository } from '../../expense/infrastructure/FileSystemExpenseRepository.js'

const categoryRepository: ICategoryRepository = new FileSystemCategoryRepository('category')
const expenseRepository: IExpenseRepository = new FileSystemExpenseRepository('expenses')
const budgetRepository: IBudgetRepository = new FileSystemBudgetRepository('budgets')

export const ServiceContainer = {
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
    getById: new ExpenseGetById(expenseRepository, categoryRepository),
    getByCategory: new ExpenseGetByCategory(expenseRepository, categoryRepository),
    getSummary: new ExpenseGetSummary(expenseRepository),
    getSummaryByMonth: new ExpenseGetSummaryByMonth(expenseRepository),
  },
  budget: {
    add: new BudgetAdd(budgetRepository),
    changeState: new BudgetChangeState(budgetRepository),
    getAll: new BudgetGetAll(budgetRepository),
    getById: new BudgetGetById(budgetRepository),
  },
}
