import { Request } from "express";

export type UserRole = "Lister" | "Seeker";

export interface AuthUser {
  id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}