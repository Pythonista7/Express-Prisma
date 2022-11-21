import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import generalConfig from "../configs/general.config";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || authHeader == "") res.status(403).send("Unauthorized");

  const token = authHeader!.split(" ")[1];

  jwt.verify(token, generalConfig.JWT_SECRET, (err: any, usr: any) => {
    if (err) {
      console.log(err);
      return res
        .status(403)
        .send("Authentication Failed! Token may have expired, login again.");
    }
    req.user = usr;
    next();
  });
};
