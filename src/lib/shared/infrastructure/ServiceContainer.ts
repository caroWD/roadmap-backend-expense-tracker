import { FileSystem } from '../../file_system/infrastructure/FileSystem.js'

export const ServiceContainer = {
  fileSystem: {
    categories: new FileSystem('category', 'json', '../../../repository/fs'),
    expenses: new FileSystem('expenses', 'json', '../../../repository/fs'),
    budgets: new FileSystem('budgets', 'json', '../../../repository/fs'),
  },
}
