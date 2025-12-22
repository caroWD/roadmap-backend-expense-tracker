export interface IFileSystem {
  ReadFile(): Promise<string>

  WriteFile(data: string): Promise<boolean>
}
