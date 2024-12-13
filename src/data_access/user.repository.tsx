import prisma from '@/lib/prisma'
import { CreatedUser } from '@/types/userTypes'
import { User } from '@prisma/client'

export class UserRepository {
  async createUser(data: {
    username?: string
    email: string
    password: string
  }): Promise<CreatedUser> {
    const username = data.username ?? ''
    return await prisma.user.create({
      data: {
        username,
        email: data.email,
        password: data.password,
      },
    })
  }
  async getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }
  async getUser(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }
}
