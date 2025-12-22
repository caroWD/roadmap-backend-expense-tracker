import { CategoryDescription, CategoryId, CategoryName } from './object_values/index.js'

export class Category {
  id: CategoryId
  name: CategoryName
  description: CategoryDescription

  constructor(id: CategoryId, name: CategoryName, description: CategoryDescription) {
    this.id = id
    this.name = name
    this.description = description
  }
}
