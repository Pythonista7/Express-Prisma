import { Request, Response, ErrorRequestHandler } from "express";

// error handler
const errHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response
) => {
  console.error(err.stack);
  const statusCode = !(res.statusCode >= 200 && res.statusCode < 300)
    ? res.statusCode
    : 500;
  res.status(statusCode);
  res.send("Something went wrong :(");
};

export default errHandler;
