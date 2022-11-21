import { PrismaClient } from "@prisma/client";
import { JWTUser } from "../utils/types";

declare global {
  namespace Express {
    export interface Request {
      prisma?: PrismaClient;
      user?: JWTUser;
    }
  }
}
