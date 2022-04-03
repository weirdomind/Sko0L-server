import { NextFunction, Request, Response, Router } from "express";
import generateMultipleAvatars from "../utils/avatar";

const UtilsRouter = Router();

UtilsRouter.get(
  "/avatars",
  (req: Request, res: Response, next: NextFunction) => {
    const avatars = generateMultipleAvatars(9);
    res.status(200).json({
      success: true,
      message: "avatars generated successfully",
      data: { avatars },
    });
  }
);

export default UtilsRouter;
