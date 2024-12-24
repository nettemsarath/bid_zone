import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { UserRepository } from '@/data_access/user.repository'
import { CreatedUser, SignUpUser } from '@/types/userTypes'

const userRepository = new UserRepository()

export const createUserUsecase = async (
  data: SignUpUser,
): Promise<CreatedUser> => {
  const SALT_ROUNDS = 10
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
  data.password = hashedPassword
  const new_user = await userRepository.createUser(data)
  return new_user
}

export const getUserByIdUsecase = async (
  userId: string,
): Promise<Omit<User, 'createdAt' | 'updatedAt' | 'password'> | null> => {
  const user = await userRepository.getUserById(userId)
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  }
}

export const getLoginUserUsecase = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<CreatedUser | null> => {
  const user = await userRepository.getUser(email)
  if (!user) return null
  // check passowrd entred is correct or not here
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Passowrd does not Match')
  }
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
