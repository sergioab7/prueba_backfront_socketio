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

let usuarios_conectados = [];
io.on("connection", socket => {
    
    
    socket.on("login", (user) => {
        console.log(`[+] Usuario: ${user} conectado.`);
        io.emit("users_conectados", usuarios_conectados);
    })
    
    socket.on("join_room", (datos) => {
        socket.join(datos.room);
        let date = {
            room:datos.room,
            user:datos.user
        }
        usuarios_conectados.push(date);
        console.log(`El usuario: ${datos.user} ha entrado a la sala: ${datos.room}`);
    })

    socket.on("leave_room", datos => {
        socket.leave(datos.room);
        usuarios_conectados = usuarios_conectados.filter(user => user !== datos.user);
        io.emit("users_conectados", usuarios_conectados);
    })

    socket.on("send_message_to_room", datos => {
        console.log(`Mensaje enviado a la sala: ${datos.room} por el usuario: ${datos.user} mensaje: ${datos.message}`);
        
        socket.to(datos.room).emit("received_message", datos);
    })
    socket.on("mostrar_usuarios_conectados", () => {
        io.emit("users_conectados", usuarios_conectados);
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