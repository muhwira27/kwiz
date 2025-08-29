import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/session/encrypt';

export async function POST(req: NextRequest) {
  const userData = await req.json();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  const token = await encrypt({ userData, expires });

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });
  return res;
}

