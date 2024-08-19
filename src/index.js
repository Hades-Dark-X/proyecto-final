import { app } from "./app.js"
import { conexionDB } from "./db.js"
import dotenv from "dotenv"


conexionDB()
dotenv.config()

const port= process.env.PORT || 3000

app.listen(port, ()=> console.log(`Servidor a la escucha en el puerto: ${port}`))