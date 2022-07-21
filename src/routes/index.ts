import express from 'express';

export const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.ok('HELLO WORLD');
});

export default router;