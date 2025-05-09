'use client'

import { useState } from 'react'

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
        <h2 className="mt-6 text-center text-3xl font-light text-gray-50">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href={alternativeLink} className="font-light text-gray-300 hover:text-gray-400">
            {alternativeText}
          </a>
        </p>
      </div>
      <form className="mt-8 space-y-6 p-8 rounded-lg shadow" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-gray-200 focus:border-gray-300 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div className="pt-2">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-gray-200 focus:border-gray-300 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {!isLogin && (
            <div className="pt-5">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-300 rounded-b-md rounded-t-md focus:outline-none focus:ring-gray-200 focus:border-gray-300 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

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