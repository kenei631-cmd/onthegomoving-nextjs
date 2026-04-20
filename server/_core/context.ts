import { NextRequest } from "next/server";
import { getUserFromRequest } from "./auth";

export type User = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  role: "admin" | "user";
};

export type Context = {
  user: User | null;
  req: NextRequest;
};

export async function createContext(req: NextRequest): Promise<Context> {
  const user = await getUserFromRequest(req);
  return { user, req };
}
