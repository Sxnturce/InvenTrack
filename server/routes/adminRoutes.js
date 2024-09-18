import Router from "express";
import Admin from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js"
const router = Router()

//Rutas privadas
router.get("/", auth, Admin.dashboard)
router.post("/create", auth, Admin.createProduct)

router.route("/product/:id", auth).get(Admin.getProduct).post(Admin.updateProduct).delete(Admin.deleteProduct)
export default router