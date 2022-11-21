import { Router } from "express";
import login from "../controllers/auth/login";
import register from "../controllers/auth/register";
import addPrisma from "../middlewares/addPrisma";

const authRouter = Router();

// middleware
authRouter.use(addPrisma);

// routes
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
