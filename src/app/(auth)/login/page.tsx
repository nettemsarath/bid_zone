'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      username,
      email: username,
      password,
      isSignUp: false, // This signals to the API that it's a sign-in
    })
    console.log('signIn reponse isss', res)
    // if (res?.error) {
    //   setError('Invalid credentials')
    // } else if (res?.ok) {
    //   router.push('/')
    // }
  }
  console.log('session isss', session)
  // if (session) {
  //   router.push('/')
  //   return null
  // }

  return (
    <div>
      <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <a href="/auth/signup">Sign up</a>
      </p>
    </div>
  )
}

export default SignIn
