export class CategoryNameNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CategoryNameNotFoundError'
  }
}
