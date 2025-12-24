import { Command } from '@commander-js/extra-typings'
import { CommanderExpenseController } from './lib/expense/infrastructure/CommanderExpenseController.js'
import { CommanderCategoryController } from './lib/category/infrastructure/CommanderCategoryController.js'

const program: Command = new Command()
const expenseController: CommanderExpenseController = new CommanderExpenseController()
const categoryController: CommanderCategoryController = new CommanderCategoryController()

program
  .name('Expense Tracker CLI')
  .description('CLI to expense tracker to manage your finances')
  .version('1.0.0')

program.commandsGroup('Expense').description('Add, update, delete, list and summary expenses')

program
  .command('add')
  .description('Add a new expense with description, amount and category (optional)')
  .requiredOption('-d, --description <string>', 'Expense description')
  .requiredOption('-a, --amount <number>', 'Expense amount')
  .option('-c, --category <Category>', 'Expense category (optional)', 'others')
  .action(
    async (options) =>
      await expenseController.Add(options.description, options.amount, options.category),
  )

program
  .commandsGroup('Expense Category')
  .description('Add, update, delete and list expense categories')

program
  .command('add-category')
  .description('Add a new category with name and description (optional)')
  .requiredOption('-n, --name <string>', 'Category name')
  .option('-d, --description <string>', 'Category description')
  .action(async (options) => await categoryController.Add(options.name, options.description))

program.parse()
