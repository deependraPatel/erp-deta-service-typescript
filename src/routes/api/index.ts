import express from "express";

import formRouter from "./form";

export const router = express.Router();

router.use("/forms", formRouter);

export default router;
