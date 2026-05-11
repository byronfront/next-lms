import { z } from "zod"

export const createCourseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(10000).optional().nullable(),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: solo minúsculas, números y guiones")
    .optional(),
  price: z.number().nonnegative().nullable().optional(),
  isFree: z.boolean().optional().default(true),
  isPublished: z.boolean().optional().default(false),
  thumbnail: z.string().max(2000).optional().nullable(),
})

export const updateCourseSchema = createCourseSchema.partial()

export const createModuleSchema = z.object({
  title: z.string().min(1).max(200),
  courseId: z.string().min(1),
})

export const createLessonSchema = z.object({
  title: z.string().min(1).max(200),
  moduleId: z.string().min(1),
  type: z.enum(["TEXT", "VIDEO", "QUIZ"]).optional(),
})

export const updateLessonSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().max(100000).optional().nullable(),
  videoUrl: z.string().max(2000).optional().nullable(),
  type: z.enum(["TEXT", "VIDEO", "QUIZ"]).optional(),
  isPublished: z.boolean().optional(),
  isFree: z.boolean().optional(),
  quizData: z
    .array(
      z.object({
        prompt: z.string(),
        options: z.array(z.string()).min(2),
        correctIndex: z.number().int().min(0),
      })
    )
    .optional()
    .nullable(),
})

export const enrollSchema = z.object({
  courseId: z.string().min(1),
})

export const lessonProgressSchema = z.object({
  lessonId: z.string().min(1),
  courseId: z.string().min(1),
  isCompleted: z.boolean().optional().default(true),
})

export const registerSchema = z.object({
  name: z.string().max(120).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(128),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string().min(10),
  password: z.string().min(6).max(128),
})
