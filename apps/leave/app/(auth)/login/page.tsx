import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* 左侧装饰区域 */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 relative">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex flex-col h-full p-10">
          <div className="flex items-center text-lg font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Leave Admin
          </div>
          <div className="mt-auto">
            <blockquote className="space-y-2 text-white">
              <p className="text-lg">
                &ldquo;这个系统让我们的请假管理变得如此简单和高效。&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              欢迎回来
            </h1>
            <p className="text-sm text-muted-foreground">
              还没有账号？{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                立即注册
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
} 