import { NextFunction, Request, Response, Router } from 'express';

import { verifyAccessToken } from '../library/helperLib/verifyAccessToken';
import { login } from '../methods/login.user';
import { registerUser } from '../methods/register.user';

const router = Router();

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  await login(req, res, next);
})

router.post("/register",  async( req: Request, res: Response, next: NextFunction )=> {
  await registerUser(req, res, next);
} )
export = router;