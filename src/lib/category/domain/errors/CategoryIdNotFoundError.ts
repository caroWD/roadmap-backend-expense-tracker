export class CategoryIdNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CategoryIdNotFoundError'
  }
}
