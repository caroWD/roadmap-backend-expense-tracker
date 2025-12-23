import {
  CategoryDtoId,
  CategoryDtoName,
  CategoryDtoDescription,
  CategoryDtoCreatedAt,
} from './object_values/index.js'
export class CategoryDto {
  id: CategoryDtoId
  name: CategoryDtoName
  description: CategoryDtoDescription
  createdAt: CategoryDtoCreatedAt

  constructor(
    id: CategoryDtoId,
    name: CategoryDtoName,
    description: CategoryDtoDescription,
    createdAt: CategoryDtoCreatedAt,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
  }
}
