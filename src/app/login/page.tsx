'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AuthForm } from '@/components/auth/AuthForm'
import { login } from './actions'

export default function LoginPage() {
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmed = searchParams.get('confirmed')
    if (confirmed === 'true') {
      setMessage('Email confirmed successfully! You can now log in.')
    }
  }, [searchParams])

  return (
    <div className="h-full flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {message && (
          <div className="text-green-500 text-center text-sm">
            {message}
          </div>
        )}
        <AuthForm type="login" onSubmit={login} />
      </div>
    </div>
  )
}