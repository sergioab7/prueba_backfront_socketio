import { Router } from "express";
import { login, registro } from "../controllers/Auth.controller.js";

const route = Router();


route.post("/registro", registro);
route.post("/login", login);

export default route;