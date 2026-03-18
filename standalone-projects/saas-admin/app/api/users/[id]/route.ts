import { NextRequest, NextResponse } from 'next/server'
import { users } from '../usersData'

type Params = Promise<{ id: string }>

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params
  const user = users.find(u => u.id === id)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params
  const body = await request.json()
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  users[index] = { ...users[index], ...body }
  return NextResponse.json(users[index])
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  users.splice(index, 1)
  return NextResponse.json({ success: true })
}
