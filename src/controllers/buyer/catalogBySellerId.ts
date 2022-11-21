import { NextFunction, Request, Response } from "express";
import { UserType } from "../../utils/enums";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { seller_id } = req.params;
  let data = await req.prisma!.user.findMany({
    where: {
      id: seller_id,
      type: UserType.Seller.toString(),
    },
    select: {
      username: true,
      Catalog: {
        include: {
          sellerId: true,
          Item: true,
        },
      },
    },
  });

  if (!data) next(new Error("Failed to fetch catalog data."));
  if (data.length == 0)
    return res.status(200).send("No Catalog found for this seller!");

  return res.status(200).json(data);
};
