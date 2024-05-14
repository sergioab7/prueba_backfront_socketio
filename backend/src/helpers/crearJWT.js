import jwt from "jsonwebtoken";


export const mijwt = (id) => {
    const mi_jwt = new Promise((resolve,reject) => {
        jwt.sign({id:id}, process.env.JWT_TOKEN, {expiresIn:'4d'}, (err,token) => {
            if(err) reject(err);
            resolve(token);
        })
    })

    return mi_jwt;
}