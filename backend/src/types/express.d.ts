import { Request } from "express";

export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | any;
    }
  }
}
