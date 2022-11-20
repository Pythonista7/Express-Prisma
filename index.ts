import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import config from "./src/configs/general.config";
import router from "./src/routes/router";

const app = express();

app.use(router);

// error handler
const errHandle: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong :(");
};
app.use(errHandle);

app.listen(config.PORT, () => {
  console.log("Server started on port " + config.PORT);
});
