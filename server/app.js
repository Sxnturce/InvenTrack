import express from "express";
import dotenv from "dotenv"
import router from "./routes/userRoutes.js";
import routerAdmin from "./routes/adminRoutes.js"
import connectDB from "./helpers/conexionDB.js";
import pc from "picocolors"
import cookieParser from "cookie-parser";
import cors from "cors"
import corsOptions from "./middlewares/cors.js";
import path from "path";
import url from "url";

dotenv.config()

//Conexion a la DB
await connectDB()

//Instanciar el servidor express
const server = express()

//Middlewares
server.use(cors(corsOptions))
server.use(cookieParser());
server.use(express.json())

//Puerto del servidor
const port = process.env.PORT ?? 4000

server.listen(port, () => {
  console.log(pc.magenta(`Server listening in URL: ${pc.white(`http://localhost:${port}`)} 🚀`));
})


// Servir archivos estáticos de la carpeta build
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.static(path.join(__dirname, "../client/build")));

// Redirigir todas las demás solicitudes a la pagina principal
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


//Middleware para la ruta de la API
server.use("/api/user/", router)
server.use("/api/admin/dashboard", routerAdmin)


