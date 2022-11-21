import { Router } from "express";
import { healthCheck } from "../controllers/health";
import authRouter from "./auth";
import buyerRouter from "./buyer";

const router = Router();

router.get("/health", healthCheck);

router.use("/auth", authRouter);

router.use("/buyer", buyerRouter);

export default router;
