import type { IFileSystem } from '../../domain/IFileSystem.js'

export class FileSystemWriteFile {
  private readonly _fileSystem: IFileSystem

  constructor(fileSystem: IFileSystem) {
    this._fileSystem = fileSystem
  }

  async Run(data: string): Promise<void> {
    const isWrited: boolean = await this._fileSystem.WriteFile(data)

    if (!isWrited) {
      throw new Error('Error writing file')
    }
  }
}
