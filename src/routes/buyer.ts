import { Router } from "express";
import catalogBySellerId from "../controllers/buyer/catalogBySellerId";
import listSellers from "../controllers/buyer/listSellers";
import addPrisma from "../middlewares/addPrisma";
import checkAuth from "../middlewares/checkAuth";

const buyerRouter = Router();

// middleware
buyerRouter.use(checkAuth);
buyerRouter.use(addPrisma);

// routes
buyerRouter.get("/list-of-sellers", listSellers);
buyerRouter.get("/seller-catalog/:seller_id", catalogBySellerId);

export default buyerRouter;
