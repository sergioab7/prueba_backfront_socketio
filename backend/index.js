import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io"; 
import cors from "cors";
import { connection } from "./src/db/connectDB.js";

/* Rutas */
import AuthRoute from "./src/routes/Auth.route.js";
import DashboardRoute from "./src/routes/Dashboard.routes.js";


const app = express();
app.use(cors({
    origin:'localhost:5173'
}));
app.use(express.json());
const server = createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin:'http://localhost:5174'
//     }
// });
const PORT = process.env.PORT || 4001;

/* conectar bbdd*/
connection(); 

// io.on("connection", socket => {
//     console.log(`[+] Usuario: ${socket.id} conectado.`);

//     io.on("disconnect", () => {
//         console.log(`[!] Usuario ${socket.id} desconectado.`);
//     })
// })


/* Rutas*/
app.use("/api/auth", AuthRoute);
app.use("/api/dashboard", DashboardRoute);



server.listen(PORT, () => {
    console.log(`[+] Servidor corriendo en el puerto: ${PORT}`);
})