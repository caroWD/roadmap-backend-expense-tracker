import { stringify } from 'csv-stringify'
import type { ICSV } from '../domain/ICSV.js'
import type { FileSystem } from '../../file_system/infrastructure/FileSystem.js'
import type { TExpenseDto } from '../../expense/infrastructure/schemas/ExpenseDtoSchema.js'

export class CSV implements ICSV {
  private readonly _fileSystem: FileSystem

  constructor(fileSystem: FileSystem) {
    this._fileSystem = fileSystem
  }

  async Export(expenses: TExpenseDto[]): Promise<void> {
    if (!expenses.length) throw new Error('Expenses not found')

    stringify(expenses, { header: true }, (error, output) => {
      if (!error) {
        this._fileSystem
          .WriteFile(output)
          .then((isWrited) => {
            if (isWrited) console.log('CSV file successfully created.')
          })
          .catch((error) => console.log('An error occurred:', error))
      }
    })
  }
}
