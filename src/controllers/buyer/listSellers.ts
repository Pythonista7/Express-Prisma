import { NextFunction, Request, Response } from "express";
import { UserType } from "../../utils/enums";

type responseBody = {
  id: string;
  username: string;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  let data: responseBody[] = await req.prisma!.user.findMany({
    where: {
      type: UserType.Seller.toString(),
    },
    select: {
      id: true,
      username: true,
    },
  });
  if (!data) next(new Error("Failed to fetch seller data."));
  if (data.length == 0) return res.status(200).send("No Sellers found!");
  return res.status(200).json(data);
};
