import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const data = await req.prisma!.orders.findMany({
    where: {
      sellerId: req.user!.uid,
    },
  });

  if (!data) {
    res.status(500);
    next(new Error("Could not find orders data!"));
    return;
  }

  res.status(200).json(data);
};
