'use client'

import { useState } from 'react'
import { TextInput } from '../common/TextInput'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 20
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface AuthFormProps {
  type: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
}

interface ValidationError {
  isValid: boolean
  message: string
}

const validateEmail = (email: string): ValidationError => {
  if (!email) {
    return { isValid: false, message: 'Email is required' }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Invalid email format' }
  }
  return { isValid: true, message: '' }
}

const validatePassword = (password: string, confirmPassword?: string): ValidationError => {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { isValid: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` }
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return { isValid: false, message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters` }
  }
  if (confirmPassword && password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' }
  }
  return { isValid: true, message: '' }
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isLogin = type === 'login'
  const title = isLogin ? 'Sign in to your account' : 'Create a new account'
  const buttonText = isLogin ? 'Sign in' : 'Create account'
  const alternativeText = isLogin ? 'create a new account' : 'sign in to your account'
  const alternativeLink = isLogin ? '/signup' : '/login'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string

      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        setError(emailValidation.message)
        return
      }

      const passwordValidation = validatePassword(password, isLogin ? undefined : confirmPassword)
      if (!passwordValidation.isValid) {
        setError(passwordValidation.message)
        return
      }

      await onSubmit(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
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

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Loading...' : buttonText}
          </button>
        </div>
      </form>
    </div>
  )
} 