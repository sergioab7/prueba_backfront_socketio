import { Router } from "express";
import { verificarJWT } from "../helpers/verificarToken.js";
import { extraerSalaGeneral, salas, usuarios } from "../controllers/Dashboard.controller.js";

const route = Router();


route.get("/usuarios", verificarJWT,usuarios);
route.post("/salas", verificarJWT,salas);
route.get("/sala-general", verificarJWT,extraerSalaGeneral);

export default route;