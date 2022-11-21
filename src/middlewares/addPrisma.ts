import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  req.prisma = new PrismaClient();
  next();
};
