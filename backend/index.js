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
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173'
    }
});
const PORT = process.env.PORT || 4001;

/* conectar bbdd*/
connection(); 

io.on("connection", socket => {

    socket.on("login", (user) => {
        console.log(`[+] Usuario: ${user} conectado.`);
    })
    socket.on("join_room", (datos) => {
        console.log(`El usuario: ${datos.user} ha entrado a la sala: ${datos.room}`);
        socket.join(datos.room);
    })

    socket.on("send_message_to_room", datos => {
        console.log(`Mensaje enviado a la sala: ${datos.room} por el usuario: ${datos.user}`);

        io.to(datos.room).emit("received_message", datos.message);
    })
    socket.on("disconnect", () => {
        console.log(`[!] Usuario ${socket.id} desconectado.`);
    })
})


/* Rutas*/
app.use("/api/auth", AuthRoute);
app.use("/api/dashboard", DashboardRoute);



server.listen(PORT, () => {
    console.log(`[+] Servidor corriendo en el puerto: ${PORT}`);
})