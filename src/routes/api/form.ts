import express from "express";

export const router = express.Router();

router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.ok("Form post");
  }
);

export default router;
