import type { IFileSystem } from '../domain/IFileSystem.js'
import { readFile, writeFile, access, constants, mkdir } from 'node:fs/promises'
import { URL } from 'node:url'

type ExtensionFile = 'json' | 'txt' | 'csv'

export class FileSystem implements IFileSystem {
  private readonly _fileName: string
  private readonly _extension: ExtensionFile
  private readonly _directory: string

  constructor(fileName: string, extension: ExtensionFile, directory: string) {
    this._fileName = fileName
    this._extension = extension
    this._directory = directory
  }

  async ReadFile(): Promise<string> {
    const directoryURL: URL = new URL(this._directory, import.meta.url)

    const directoryExists: boolean = await this.EnsureDirectoryOrFileExists(directoryURL.pathname)

    if (!directoryExists) return '[]'

    const fileURL: URL = new URL(
      `${this._directory}/${this._fileName}.${this._extension}`,
      import.meta.url,
    )

    const fileExists: boolean = await this.EnsureDirectoryOrFileExists(fileURL.pathname)

    if (!fileExists) return '[]'

    return await readFile(fileURL.pathname, { encoding: 'utf-8' })
  }

  async WriteFile(data: string): Promise<boolean> {
    const directoryURL: URL = new URL(this._directory, import.meta.url)

    const directoryExists: boolean = await this.EnsureDirectoryOrFileExists(directoryURL.pathname)

    if (!directoryExists) await mkdir(directoryURL.pathname, { recursive: true })

    const fileURL: URL = new URL(
      `${this._directory}/${this._fileName}.${this._extension}`,
      import.meta.url,
    )

    try {
      await writeFile(fileURL.pathname, data, { encoding: 'utf-8' })

      return true
    } catch {
      return false
    }
  }

  private async EnsureDirectoryOrFileExists(path: string): Promise<boolean> {
    try {
      await access(path, constants.R_OK | constants.W_OK)

      return true
    } catch {
      return false
    }
  }
}
