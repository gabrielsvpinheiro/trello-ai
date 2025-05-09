import { signup } from './actions'
import { AuthForm } from '@/components/auth/AuthForm'

export default function SignupPage() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm type="signup" onSubmit={signup} />
    </div>
  )
} 