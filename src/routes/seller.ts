import { Router } from "express";
import addPrisma from "../middlewares/addPrisma";
import checkAuth from "../middlewares/checkAuth";

const sellerRouter = Router();

// middleware
sellerRouter.use(checkAuth);
sellerRouter.use(addPrisma);

sellerRouter.post("/create-catalog", () => {});
sellerRouter.get("/orders", () => {});
