import { Router } from "express";
import { verificarJWT } from "../helpers/verificarToken.js";
import { salas, usuarios } from "../controllers/Dashboard.controller.js";

const route = Router();


route.get("/usuarios", verificarJWT,usuarios);
route.get("/salas", verificarJWT,salas);

export default route;