'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserAction } from '../__actions/createUser'
import { useServerActionMutation } from '@/lib/hooks/server-actio-hooks'
import { toast } from 'sonner'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    data,
    mutateAsync: createUserMutate,
    isPending,
  } = useServerActionMutation(createUserAction, {
    onError: (error) => {
      return alert(error.message || 'Failed to create User')
    },
    onSuccess: (data) => {
      toast.success(`${data.message}`)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createUserMutate({
      email: username,
      username: username,
      password: password,
    })
    router.push('/')
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  )
}

export default SignUp
