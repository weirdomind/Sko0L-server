import { Router } from "express";
import AuthRouter from "./auth";
import UtilsRouter from "./utils";
const router = Router();

router.use("/auth", AuthRouter);
router.use("/utils", UtilsRouter);

export default router;
