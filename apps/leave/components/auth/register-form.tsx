'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { Icons } from '@repo/ui/components/icons'

export function RegisterForm() {
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
    const name = formData.get('name') as string

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '注册失败')
      }

      // 注册成功后跳转到登录页面
      router.push('/login')
    } catch (error) {
      setError(error instanceof Error ? error.message : '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">姓名</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="请输入姓名"
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="请输入邮箱"
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="请输入密码"
          disabled={loading}
        />
      </div>
      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        {loading ? '注册中...' : '注册'}
      </Button>
    </form>
  )
} 