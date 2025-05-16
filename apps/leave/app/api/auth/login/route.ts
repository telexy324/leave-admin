import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { comparePassword } from '@/lib/auth/password'
import { generateToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码长度不能少于6个字符'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      )
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
    })

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    )
  }
} 