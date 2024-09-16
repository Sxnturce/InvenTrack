import Router from "express";
import { User } from "../controllers/userController.js";


const router = Router()

router.post("/", User.userRegister)

export default router;