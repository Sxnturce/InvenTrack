import db from "../models/database/database.js";
import pc from "picocolors"

async function connectDB() {
  try {
    await db.authenticate();
    console.log(pc.yellowBright('Conectado a la DB ✅'));
  } catch (e) {
    console.error(pc.red('Error al conectar a la DB ☢️'));
  }
}

export default connectDB