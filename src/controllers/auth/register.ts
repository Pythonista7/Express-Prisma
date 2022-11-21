import { NextFunction, Request, Response } from "express";
import { UserType } from "../../utils/enums";
import * as bcrypt from "bcrypt";

type requestBody = { username: string; password: string; userType: UserType };
type responseBody = { message: string };

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { username, password, userType }: requestBody = req.body;

    if (!username || !password || !userType) {
      res.status(400);
      throw new Error("Please provide all the required fields");
    }

    // check if username already exists
    try {
      req.prisma!.user.findUniqueOrThrow({
        where: {
          username: username.toString(),
        },
      });
    } catch (e) {
      res.status(400);
      next(new Error("Bad Request. Username already exists."));
    }

    // hash password
    password = bcrypt.hashSync(password, 12);

    // create user
    const op = await req.prisma!.user.create({
      data: {
        username,
        password,
        type: userType.toString(),
      },
    });
    if (!op.id) throw new Error("User creation failed.");

    const response: responseBody = { message: "User successfully created" };
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
};
