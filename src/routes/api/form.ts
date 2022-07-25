import express from "express";
import { Forms } from "../../models/forms";

export const router = express.Router();

router.post(
	"/",
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const form = await Forms.create(req.body);
		res.ok(form);
	}
);

router.get(
	"/",
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const forms = await Forms.find();

		res.ok(forms);
	}
);

export default router;
