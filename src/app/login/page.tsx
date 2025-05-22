'use client'

import { AuthForm } from '@/components/auth/AuthForm'
import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm type="login" onSubmit={login} />
    </div>
  )
}