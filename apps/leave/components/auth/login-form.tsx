'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@leave-admin/ui'
import { Input } from '@leave-admin/ui'
import { Label } from '@leave-admin/ui'
import { Icons } from '@leave-admin/ui'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }

      // 存储 token
      localStorage.setItem('token', data.token)
      
      // 跳转到仪表板
      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium leading-none">
            邮箱
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="请输入邮箱"
            disabled={loading}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium leading-none">
            密码
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="请输入密码"
            disabled={loading}
            className="h-10"
          />
        </div>
      </div>
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}
      <Button type="submit" className="w-full h-10" disabled={loading}>
        {loading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        {loading ? '登录中...' : '登录'}
      </Button>
    </form>
  )
} 