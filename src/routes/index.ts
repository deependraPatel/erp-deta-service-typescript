import express from "express";
import apiRouter from "./api";

export const router = express.Router();

router.use("/api", apiRouter);

router.get('/', (req: express.Request, res: express.Response) => {
    res.ok('Server running.');
})

export default router;
