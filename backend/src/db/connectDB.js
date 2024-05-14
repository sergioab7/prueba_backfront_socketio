import { connect } from "mongoose";

export const connection = async() => {
    try {
        await connect("mongodb://localhost:27017/chat");
        console.log("[+] BBDD conectada correctamente!")
    } catch (error) {
        console.log("[-] Error en la BBDD")
    }
}