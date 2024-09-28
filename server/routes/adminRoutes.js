import Router from "express";
import Admin from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js"
const router = Router()

//Rutas privadas
router.route("/").get(auth, Admin.dashboard).post(auth, Admin.findCategory)
router.post("/create", auth, Admin.createProduct)

//HOME ENDPOINTS
router.get("/all-tipes", auth, Admin.allTipes)
router.get("/tipo/:id", auth, Admin.getTipo)
router.get("/get-top-users", auth, Admin.getTopUsers)
router.get("/get-top-product", auth, Admin.getTopProduct)
router.get("/get-top-tipo", auth, Admin.getTopTipe)

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