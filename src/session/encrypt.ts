import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("Missing SESSION_SECRET environment variable");
}
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30))
    .sign(key);
}

export async function decrypt(input: string): Promise<any | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    // Invalid/expired token or key mismatch
    return null;
  }
}
