import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">登录</h1>
          <p className="text-gray-500">欢迎回来</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
} 