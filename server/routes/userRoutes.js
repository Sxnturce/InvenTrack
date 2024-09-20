import Router from "express";
import { User } from "../controllers/userController.js";
const router = Router()

//Rutas publicas
router.post("/", User.loginUser)
router.post("/register", User.userRegister)
router.get("/confirm-email/:token", User.confirmEmail)

//Recuperar contraseña
router.post("/forgot-pass", User.forgotPass)
router.post("/comprobate-token-pass", User.comprobatePassToken)
router.post("/change-password/:token_pass", User.changePassword)
export default router;
