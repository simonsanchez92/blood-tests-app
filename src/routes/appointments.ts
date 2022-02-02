import { Router } from "express";
const router: Router = Router();
import { appointmentsController } from "../controllers/appointmentsController";

router.post("/", appointmentsController.generateOne);
router.get("/", appointmentsController.getAppointments);

export default router;
