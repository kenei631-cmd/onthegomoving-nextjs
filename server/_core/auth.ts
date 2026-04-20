import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getUserByOpenId } from "../db";
import { ENV } from "./env";

const COOKIE_NAME = "session";

export async function getUserFromRequest(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(ENV.jwtSecret);
    const { payload } = await jwtVerify(token, secret);

    const openId = payload.sub as string;
    if (!openId) return null;

    const user = await getUserByOpenId(openId);
    return user ?? null;
  } catch {
    return null;
  }
}

export async function signToken(openId: string): Promise<string> {
  const { SignJWT } = await import("jose");
  const secret = new TextEncoder().encode(ENV.jwtSecret);
  return new SignJWT({ sub: openId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}
