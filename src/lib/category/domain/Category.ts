import {
  CategoryDescription,
  CategoryId,
  CategoryName,
  CategoryCreatedAt,
} from './object_values/index.js'

export class Category {
  id: CategoryId
  name: CategoryName
  description: CategoryDescription
  createdAt: CategoryCreatedAt

  constructor(
    id: CategoryId,
    name: CategoryName,
    description: CategoryDescription,
    createdAt: CategoryCreatedAt,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
  }
}
