import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

type requestBody = {
  name?: string;
  items: {
    name: string;
    sellerId: string;
    price: number;
  }[];
};

export default async (req: Request, res: Response, next: NextFunction) => {
  let body: requestBody = req.body;
  body.items = body.items.map((i) => {
    i.sellerId = req.user!.uid;
    return i;
  });

  const name = body.name || randomUUID();
  const r = await req.prisma!.catalog.create({
    data: {
      name,
      sellerId: req.user!.uid,
      Items: {
        createMany: {
          data: body.items,
        },
      },
    },
  });

  if (!r) {
    next(new Error("Failed to create Catalog!"));
    return;
  }

  return res.status(200).send("Successfully created catalog : " + name);
};
