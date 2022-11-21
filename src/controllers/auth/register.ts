import { NextFunction, Request, Response } from "express";
import { UserType } from "../../utils/enums";
import * as bcrypt from "bcrypt";
import { JWTUser } from "../../utils/types";
import { createHash, randomUUID } from "crypto";
import { generateTokens } from "../../utils/authUtils";

type requestBody = { username: string; password: string; userType: UserType };
type responseBody = { accessToken: string; refreshToken: string };

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

    // create user token and refresh token
    const refreshTokenTrackerId = randomUUID();
    const payload: JWTUser = {
      uid: op.id,
      username: op.username,
    };
    const { accessToken, refreshToken } = generateTokens(
      payload,
      refreshTokenTrackerId
    );

    // save refresh token state to db
    const rft = await req.prisma!.refreshTokens.create({
      data: {
        id: refreshTokenTrackerId,
        userId: op.id,
        hashedToken: createHash("sha256").update(refreshToken).digest("hex"),
      },
    });

    if (!rft.id) throw new Error("Unable to generate user tokens.");

    // send response
    const tokens: responseBody = {
      accessToken,
      refreshToken,
    };

    res.status(200).send(tokens);
  } catch (e) {
    next(e);
  }
};
