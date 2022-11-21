import generalConfig from "../configs/general.config";
import { JWTUser } from "./types";
import * as jwt from "jsonwebtoken";

export const generateTokens = (
  user: JWTUser,
  refreshTokenTrackerId: string
) => {
  if (
    generalConfig.JWT_SECRET === "" ||
    generalConfig.JWT_REFRESH_SECRET === ""
  ) {
    throw new Error("Unable to register user.");
  }
  const accessToken = jwt.sign(user, generalConfig.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(
    { uid: user.uid, jti: refreshTokenTrackerId },
    generalConfig.JWT_REFRESH_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { accessToken, refreshToken };
};
