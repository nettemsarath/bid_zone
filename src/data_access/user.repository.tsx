import prisma from '@/lib/prisma'

export class userRepository {
  async createUser(data: { name: string; email: string }) {
    // Data access logic to interact with the database (using Prisma, in this case)
    return await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
      },
    })
  }
}
