import Router from "express";
import Admin from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js"
const router = Router()

//Rutas privadas
router.route("/").get(auth, Admin.dashboard).post(auth, Admin.findCategory)
router.post("/create", auth, Admin.createProduct)

//CRUD productos
router.route("/product/:id").get(auth, Admin.getProduct).put(auth, Admin.updateProduct).delete(auth, Admin.deleteProduct)

//Generar pedido
router.get("/reports", auth, Admin.getReports)
router.post("/generar-pedido", auth, Admin.generateReport)
router.patch("/generar-pedido/:id", auth, Admin.updateReport)

//Realizar venta
router.get("/ventas", auth, Admin.getVentas)
router.post("/create-venta", auth, Admin.createVenta)

//Logout
router.post("/logout", auth, Admin.clearCookie)
export default router