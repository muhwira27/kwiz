'use server'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./encrypt";

export async function setSession(userData: any) {
  // Create the session
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // One month in milliseconds
  const session = await encrypt({ userData, expires });

  // Save the session in a cookie
  cookies().set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });
}

export async function deleteSession(){
  // Destroy the session
  cookies().set({
    name: "session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });
}

export async function getSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (!parsed) {
    // invalid token; clear cookie
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    });
    return res;
  }
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: parsed.expires,
    path: '/',
  });
  return res;
}
