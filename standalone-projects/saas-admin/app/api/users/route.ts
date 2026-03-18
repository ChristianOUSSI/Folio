import { NextRequest, NextResponse } from 'next/server'
import { users } from './usersData'

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newUser = { id: crypto.randomUUID(), ...body }
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}

