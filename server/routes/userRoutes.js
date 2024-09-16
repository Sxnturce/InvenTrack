import Router from "express";
import { User } from "../controllers/userController.js";
import Admin from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js"

const router = Router()

//Rutas publicas
router.post("/", User.loginUser)
router.post("/register", User.userRegister)
router.get("/confirm-email/:token", User.confirmEmail)

//Rutas privadas
router.get("/dashboard", auth, Admin.dashboard)
export default router;
