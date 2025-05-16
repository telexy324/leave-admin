import Link from 'next/link'
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">注册</h1>
          <p className="text-sm text-gray-500">
            已有账号？{' '}
            <Link href="/login" className="text-primary hover:underline">
              立即登录
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
} 