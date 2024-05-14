import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io"; 
import cors from "cors";


const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173',
        methods:['GET', 'POST', 'PUT', 'DELETE']
    }
});
const PORT = process.env.PORT || 4001

io.on("connection", socket => {
    console.log(`[+] Usuario: ${socket.id} conectado.`);

    io.on("disconnect", () => {
        console.log(`[!] Usuario ${socket.id} desconectado.`);
    })
})

server.listen(PORT, () => {
    console.log(`[+] Servidor corriendo en el puerto: ${PORT}`);
})