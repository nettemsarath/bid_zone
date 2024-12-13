import { z } from 'zod'
import { User } from '@prisma/client'

export const SignupUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export interface SignUpUser {
  username: string
  email: string
  password: string
}

export type CreatedUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>
