import express, { json } from "express";
import config from "./src/configs/general.config";
import basicLogger from "./src/middlewares/basicLogger";
import errHandler from "./src/middlewares/handleError";
import notFound from "./src/middlewares/notFound";
import router from "./src/routes/router";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(basicLogger);

app.use("/api", router);

app.use(notFound);
app.use(errHandler);

app.listen(config.PORT, () => {
  console.log("Server started on port " + config.PORT);
});
