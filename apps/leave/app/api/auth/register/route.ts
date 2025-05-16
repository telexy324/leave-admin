import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/auth/password'
import { z } from 'zod'

const prisma = new PrismaClient()

const registerSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码长度不能少于6个字符'),
  name: z.string().min(2, '姓名长度不能少于2个字符'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = registerSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password, name } = result.data

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      )
    }

    // 获取默认用户角色
    const defaultRole = await prisma.role.findFirst({
      where: { name: 'user' },
    })

    if (!defaultRole) {
      return NextResponse.json(
        { error: '系统错误：默认角色不存在' },
        { status: 500 }
      )
    }

    // 创建新用户
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId: defaultRole.id,
      },
      include: {
        role: true,
      },
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: '注册失败' },
      { status: 500 }
    )
  }
} 