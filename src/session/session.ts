'use server'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./encrypt";

export async function setSession(userData: any) {
  // Create the session
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // One month in milliseconds
  const session = await encrypt({ userData, expires });

  // Save the session in a cookie
  const response = NextResponse.next();
  cookies().set("session", session, { expires, httpOnly: true });}

export async function deleteSession(){
  // Destroy the session
  const response = NextResponse.next();
  cookies().set("session", "", { expires: new Date(0) });
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
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
