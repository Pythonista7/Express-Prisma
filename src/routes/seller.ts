import { Router } from "express";
import createCatalog from "../controllers/seller/createCatalog";
import sellerOrders from "../controllers/seller/sellerOrders";
import addPrisma from "../middlewares/addPrisma";
import checkAuth from "../middlewares/checkAuth";

const sellerRouter = Router();

// middleware
sellerRouter.use(checkAuth);
sellerRouter.use(addPrisma);

sellerRouter.post("/create-catalog", createCatalog);
sellerRouter.get("/orders", sellerOrders);

export default sellerRouter;
