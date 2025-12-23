export class CategoryDto {
  id: number
  name: string
  description: string
  createdAt: string

  constructor(id: number, name: string, description: string, createdAt: string) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
  }
}
