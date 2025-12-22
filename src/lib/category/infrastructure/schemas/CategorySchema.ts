import * as z from 'zod'

export const categoryIdSchema = z.number().int().positive()

export type TCategoryId = z.infer<typeof categoryIdSchema>

export const categoryNameSchema = z.string().min(2).max(50)

export type TCategoryName = z.infer<typeof categoryNameSchema>

export const categoryDescriptionSchema = z.string().min(22).max(255).optional()

export type TCategoryDescription = z.infer<typeof categoryDescriptionSchema>

export const categoryCreatedAtSchema = z.date()

export type TCategoryCreatedAt = z.infer<typeof categoryCreatedAtSchema>

export const categorySchema = z.object({
  id: categoryIdSchema,
  name: categoryNameSchema,
  description: categoryDescriptionSchema,
  createdAt: categoryCreatedAtSchema,
})

export type TCategory = z.infer<typeof categorySchema>
