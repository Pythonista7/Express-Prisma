import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { seller_id } = req.params;
  if (!seller_id) {
    res.status(400);
    next(new Error("No sellerId"));
  }

  const { items } = req.body;

  const itemsData = items.map((i: string) => {
    return {
      buyerId: req.user!.uid,
      sellerId: seller_id,
      itemId: i,
    };
  });

  const r = await req.prisma!.orders.createMany({
    data: itemsData,
  });
  if (!r) {
    next(new Error("Could not place orders."));
    return;
  }

  res.status(200).send("Order Placed.");
};
