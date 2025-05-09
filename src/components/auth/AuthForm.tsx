'use client'

import { useState } from 'react'
import { TextInput } from '../common/TextInput'

interface AuthFormProps {
  type: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const isLogin = type === 'login'
  const title = isLogin ? 'Sign in to your account' : 'Create a new account'
  const buttonText = isLogin ? 'Sign in' : 'Create account'
  const alternativeText = isLogin ? 'create a new account' : 'sign in to your account'
  const alternativeLink = isLogin ? '/signup' : '/login'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    await onSubmit(email, password)
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-light text-gray-50">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href={alternativeLink} className="font-light text-gray-300 hover:text-gray-400">
            {alternativeText}
          </a>
        </p>
      </div>
      <form className="mt-8 space-y-6 p-8 rounded-lg shadow" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="rounded-t-md"
            label="Email address"
          />
          <div className="pt-2">
            <TextInput
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="rounded-b-md"
              label="Password"
            />
          </div>

          {!isLogin && (
            <div className="pt-5">
              <TextInput
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="rounded-md"
                label="Confirm Password"
              />
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div>
          <button
            type="submit"
            className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
} 