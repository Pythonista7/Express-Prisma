import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { JWTUser } from "../../utils/types";
import { generateTokens } from "../../utils/authUtils";
type requestBody = { username: string; password: string };
type responseBody = { accessToken: string; refreshToken: string };

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password }: requestBody = req.body;
    if (!username || !password) {
      res.status(400);
      next(new Error("Please provide all the required fields"));
    }
    let usr;
    // check if username exists
    try {
      usr = await req.prisma!.user.findUniqueOrThrow({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          password: true,
          type: true,
        },
      });
    } catch (e) {
      res.status(400);
      next(new Error("Check your credentials and try again."));
      return;
    }
    // check if password is correct
    const isPwdValid = bcrypt.compareSync(password, usr.password);
    if (!isPwdValid) next(new Error("Check your credentials and try again."));

    // create user token and refresh token
    const refreshTokenTrackerId = randomUUID();
    const payload: JWTUser = {
      uid: usr.id,
      username: usr.username,
      type: usr.type,
    };

    const { accessToken, refreshToken } = generateTokens(
      payload,
      refreshTokenTrackerId
    );

    // TODO: Later not a requirement rn.
    // save refresh token state to db
    // const rft = await req.prisma!.refreshTokens.create({
    //   data: {
    //     id: refreshTokenTrackerId,
    //     userId: usr.id,
    //     hashedToken: createHash("sha256").update(refreshToken).digest("hex"),
    //   },
    // });

    // if (!rft.id) throw new Error("Unable to generate user tokens.");

    // send response
    const tokens: responseBody = {
      accessToken,
      refreshToken: "",
    };

    res.status(200).send(tokens);
  } catch (e) {
    next(e);
  }
};
