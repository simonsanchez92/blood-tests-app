import { Router } from "express";
const router: Router = Router();
import { usersController } from "../controllers/usersController";

router.post("/", usersController.register);

export default router;
