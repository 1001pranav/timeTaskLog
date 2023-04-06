import { NextFunction, Request, Response, Router } from "express";
import { verifyAccessToken } from "../library/helperLib/verifyAccessToken";
import { contactUs } from "../methods/contact.us";

const router = Router();

router.post("/contact", verifyAccessToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await contactUs( req, res, next);
})

export default router;