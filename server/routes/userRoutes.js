import Router from "express";
import { User } from "../controllers/userController.js";
const router = Router()

//Rutas publicas
router.post("/", User.loginUser)
router.post("/register", User.userRegister)
router.get("/confirm-email/:token", User.confirmEmail)


export default router;
