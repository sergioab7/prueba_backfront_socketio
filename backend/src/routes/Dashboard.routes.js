import { Router } from "express";
import { verificarJWT } from "../helpers/verificarToken.js";
import { extraerSalaGeneral, extraerSalaJuegos, extraerSalaNegocios, salas, usuarios } from "../controllers/Dashboard.controller.js";

const route = Router();


route.get("/usuarios", verificarJWT,usuarios);
route.post("/salas", verificarJWT,salas);
route.get("/sala-general", verificarJWT,extraerSalaGeneral);
route.get("/sala-juegos", verificarJWT,extraerSalaJuegos);
route.get("/sala-negocios", verificarJWT,extraerSalaNegocios);

export default route;