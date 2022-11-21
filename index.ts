import express, { Request, Response, NextFunction } from "express";
import config from "./src/configs/general.config";
import errHandler from "./src/middlewares/handleError";
import notFound from "./src/middlewares/notFound";
import router from "./src/routes/router";

const app = express();

app.use(router);

app.use(notFound);
app.use(errHandler);

app.listen(config.PORT, () => {
  console.log("Server started on port " + config.PORT);
});
