'use client'

import { useState } from 'react'
import { TextInput } from '../common/TextInput'
import { Button } from '../common/Button'
import { ConfirmPasswordInput } from './ConfirmPasswordInput'
import { validateEmail, validatePassword } from '@/utils/validation'
import { AUTH_TEXTS } from '@/utils/auth'

interface AuthFormProps {
  type: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    error: '',
    success: '',
    isLoading: false
  })

  const isLogin = type === 'login'
  const texts = AUTH_TEXTS[type]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData(prev => ({ ...prev, error: '', success: '', isLoading: true }))

    try {
      const form = new FormData(e.currentTarget)
      const email = form.get('email') as string

      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        setFormData(prev => ({ ...prev, error: emailValidation.message }))
        return
      }

      const passwordValidation = validatePassword(
        formData.password,
        isLogin ? undefined : formData.confirmPassword
      )
      if (!passwordValidation.isValid) {
        setFormData(prev => ({ ...prev, error: passwordValidation.message }))
        return
      }

      if (!isLogin) {
        await onSubmit(email, formData.password)
        return
      }

      await onSubmit(email, formData.password)
    } catch (err) {
      setFormData(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred. Please try again.'
      }))
    } finally {
      setFormData(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-light text-gray-50">{texts.title}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href={texts.alternativeLink} className="font-light text-gray-300 hover:text-gray-400">
            {texts.alternativeText}
          </a>
        </p>
      </div>
      <form className="mt-8 space-y-6 p-8 rounded-lg" onSubmit={handleSubmit}>
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
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              required
              className="rounded-b-md"
              label="Password"
            />
          </div>

          {!isLogin && (
            <ConfirmPasswordInput
              value={formData.confirmPassword}
              onChange={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
            />
          )}
        </div>

        {formData.error && (
          <div className="text-red-500 text-sm text-center">
            {formData.error}
          </div>
        )}

        {formData.success && (
          <div className="text-green-500 text-sm text-center">
            {formData.success}
          </div>
        )}

        <div>
          <Button
            type="submit"
            disabled={formData.isLoading}
            text={formData.isLoading ? 'Loading...' : texts.buttonText}
            className={`cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${
              formData.isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </form>
    </div>
  )
} 