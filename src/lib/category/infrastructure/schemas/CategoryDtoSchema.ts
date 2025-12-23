import * as z from 'zod'

export const categoryDtoIdSchema = z.number().int().positive()

export const categoryDtoNameSchema = z.string().min(2).max(50)

export const categoryDtoDescriptionSchema = z.string().min(22).max(255).optional()

export const categoryDtoCreatedAtSchema = z.iso.date()

export const categoryDtoSchema = z.object({
  id: categoryDtoIdSchema,
  name: categoryDtoNameSchema,
  description: categoryDtoDescriptionSchema,
  createdAt: categoryDtoCreatedAtSchema,
})

export type TCategoryDto = z.infer<typeof categoryDtoSchema>
