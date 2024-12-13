'use server'

import z from 'zod'
import { createServerAction } from 'zsa'
import { SignupUserSchema } from '@/types/userTypes'
import { createUserUsecase } from '@/use_cases/user'

export const createUserAction = createServerAction()
  .input(SignupUserSchema)
  .output(z.object({ message: z.string() }))
  .handler(async ({ input }) => {
    // your action logic here
    // console.log('input isss', input)
    const new_user = await createUserUsecase({
      username: input.username,
      email: input.email,
      password: input.password,
    })
    return {
      message: 'User is Created !!!',
    }
  })
