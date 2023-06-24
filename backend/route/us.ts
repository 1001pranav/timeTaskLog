import { NextFunction, Request, Response, Router } from "express";
import { verifyAccessToken } from "../library/helperLib/verifyAccessToken";
import { contactUss } from "../methods/contact.us";

const router = Router();

router.post("/contact", verifyAccessToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await contactUss( req, res, next);
})

export default router;