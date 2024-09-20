import express from "express";
import dotenv from "dotenv"
import router from "./routes/userRoutes.js";
import routerAdmin from "./routes/adminRoutes.js"
import connectDB from "./helpers/conexionDB.js";
import pc from "picocolors"
import cookieParser from "cookie-parser";
import corsOptions from "./middlewares/cors.js";
dotenv.config()

//Conexion a la DB
await connectDB()

//Instanciar el servidor express
const server = express()

//Middlewares
server.use(corsOptions())
server.use(cookieParser());
server.use(express.json())

//Puerto del servidor
const port = process.env.PORT ?? 4000

server.listen(port, () => {
  console.log(pc.magenta(`Server listening in URL: ${pc.white(`http://localhost:${port}`)} 🚀`));
})


//Middleware para la ruta de la API
server.use("/api/user/", router)
server.use("/api/admin/dashboard", routerAdmin) 