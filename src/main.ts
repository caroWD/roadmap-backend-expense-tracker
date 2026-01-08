#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings'
import { CommanderExpenseController } from './lib/expense/infrastructure/CommanderExpenseController.js'
import { CommanderCategoryController } from './lib/category/infrastructure/CommanderCategoryController.js'
import { CommanderBudgetController } from './lib/budget/infrastructure/CommanderBudgetController.js'

const program: Command = new Command()
const expenseController: CommanderExpenseController = new CommanderExpenseController()
const categoryController: CommanderCategoryController = new CommanderCategoryController()
const budgetController: CommanderBudgetController = new CommanderBudgetController()

program
  .name('Expense Tracker CLI')
  .description('CLI to expense tracker to manage your finances')
  .version('1.0.0')

program.commandsGroup('Expense').description('Add, update, delete, list and summary expenses')

program
  .command('add')
  .description('Add a new expense with description, amount and category (optional)')
  .option('-d, --description <string>', 'Expense description')
  .option('-a, --amount <number>', 'Expense amount')
  .option('-c, --category <Category>', 'Expense category (optional)', 'others')
  .action(
    async (options) =>
      await expenseController.Add(options.description, options.amount, options.category),
  )

program
  .command('update')
  .description('Update an expense with id, description, amount, category an date')
  .option('-i, --id <number>', 'Expense id')
  .option('-d, --description <string>', 'Expense description')
  .option('-a, --amount <number>', 'Expense amount')
  .option('-c, --category <Category>', 'Expense category')
  .option('--date <Date>', 'Expense date with format: YYYY-MM-DD')
  .action(
    async (options) =>
      await expenseController.Update(
        options.id,
        options.description,
        options.amount,
        options.category,
        options.date,
      ),
  )

program
  .command('delete')
  .description('Delete an expense with id')
  .option('-i, --id <number>', 'Expense id')
  .action(async (option) => await expenseController.Delete(option.id))

program
  .command('list')
  .description('List all expenses or list expenses by category')
  .option('-c, --category <Category>', 'Expense category')
  .action(async (option) =>
    option.category
      ? await expenseController.GetByCategory(option.category)
      : await expenseController.GetAll(),
  )

program
  .command('summary')
  .description('View a summary of all expenses')
  .option(
    '-m, --month <number>',
    'Define a month of the current year with its corresponding number value (optional). Enter a number between 1 and 12.',
  )
  .action(async (option) =>
    option.month
      ? await expenseController.GetSummaryByMonth(option.month)
      : await expenseController.GetSummary(),
  )

program
  .command('export')
  .description('Export expenses to a CSV file')
  .action(async () => await expenseController.Export())

program
  .commandsGroup('Expense Category')
  .description('Add, update, delete and list expense categories')

program
  .command('add-category')
  .description('Add a new category with name and description (optional)')
  .option('-n, --name <string>', 'Category name')
  .option('-d, --description <string>', 'Category description')
  .action(async (options) => await categoryController.Add(options.name, options.description))

program
  .command('update-category')
  .description('Update a category with id, name and description')
  .option('-i, --id <number>', 'Category id')
  .option('-n, --name <string>', 'Category name')
  .option('-d, --description <string>', 'Category description')
  .action(
    async (options) =>
      await categoryController.Update(options.id, options.name, options.description),
  )

program
  .command('delete-category')
  .description('Delete a category with id')
  .option('-i, --id <number>', 'Category id')
  .action(async (option) => await categoryController.Delete(option.id))

program
  .command('list-category')
  .description('List all categories')
  .action(async () => await categoryController.GetAll())

program.commandsGroup('Budget')

program
  .command('add-budget')
  .description('Add a new budget with amount')
  .option('-a, --amount <number>', 'Budget amount')
  .action(async (option) => await budgetController.Add(option.amount))

program
  .command('active-budget')
  .description('Active a budget with id')
  .option('-i, --id <number>', 'Budget id')
  .action(async (option) => await budgetController.ChangeState(option.id))

program
  .command('list-budgets')
  .description('List all budgets')
  .action(async () => await budgetController.GetAll())

program.parse()
