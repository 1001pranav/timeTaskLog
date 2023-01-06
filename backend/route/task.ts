import { NextFunction, Request, Response, Router } from 'express';

import { verifyAccessToken } from '../library/helperLib/verifyAccessToken';
import { addTask } from '../methods/add.task';
import { listTask } from '../methods/list.task';
import { updateTask } from '../methods/update.task';

const router = Router();

router.get( "/list", verifyAccessToken, ( req:Request, res: Response, next: NextFunction ) => {
  listTask(req, res, next);
});

router.post("/add", verifyAccessToken, (req: Request, res: Response, next: NextFunction) => {
  addTask(req, res, next);
});

router.post("/update", verifyAccessToken, (req: Request, res: Response, next: NextFunction) => {
  updateTask(req, res, next);
});

export = router;