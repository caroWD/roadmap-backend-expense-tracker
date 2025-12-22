import type { IFileSystem } from '../../domain/IFileSystem.js'

export class FileSystemReadFile {
  private readonly _fileSystem: IFileSystem

  constructor(fileSystem: IFileSystem) {
    this._fileSystem = fileSystem
  }

  async Run(): Promise<string> {
    return await this._fileSystem.ReadFile()
  }
}
