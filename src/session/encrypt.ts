import { SignJWT, jwtVerify } from "jose";

const secretKey = 'zx007'; 
console.log(secretKey)
if (!secretKey) {
  throw new Error("Missing secret key for encryption");
}
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30))
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}