import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

const database = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const host = process.env.DB_HOST
const port = process.env.DB_PORT

const db = new Sequelize(database, user, pass, {
  host,
  dialect: "mysql",
  port,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000
  },
  operatorsAliases: 0
})

export default db