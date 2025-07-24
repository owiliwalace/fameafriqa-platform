import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result')
    return NextResponse.json(rows)
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 })
  }
}
