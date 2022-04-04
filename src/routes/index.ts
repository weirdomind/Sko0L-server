import { NextFunction, Request, Response, Router } from "express";
import AuthRouter from "./auth";
import UtilsRouter from "./utils";
const router = Router();

router.use("/auth", AuthRouter);
router.use("/utils", UtilsRouter);
router.get("/test", (req: Request, res: Response, next: NextFunction) => {
  console.log("test");
  res.send("test");
});

export default router;
