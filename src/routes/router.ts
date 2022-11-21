import { Router } from "express";
import { healthCheck } from "../controllers/health";
import authRouter from "./auth";
import buyerRouter from "./buyer";
import sellerRouter from "./seller";

const router = Router();

router.get("/health", healthCheck);

router.use("/auth", authRouter);

router.use("/buyer", buyerRouter);

router.use("/seller", sellerRouter);

export default router;
