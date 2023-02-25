import { __dirname } from "../utils.js";
import path from 'path';
import fs from "fs";

const rutaLog= path.join(__dirname + '/Middleware/logs/info.log');

const Middleware= {
    midd1:(req, res, next)=>{
        if(fs.existsSync(rutaLog)){
            fs.appendFileSync(rutaLog,`\n LOG: ${req.method} - ${req.url} - ${new Date().toUTCString()}`);
        }else{
            fs.writeFileSync(rutaLog,`LOG: ${req.method} - ${req.url} - ${new Date().toUTCString()}`);
        }

        next();
    },


    middErrores:(error, req, res, next)=>{
        if(error){
            res.status(500).json({message: `Error interno en el servidor. Porfavor contacte al administrador`})
            fs.appendFileSync(rutaLog,`\n LOG: ${req.method} - ${req.url} - ${new Date().toUTCString()}`);
        }else{
            next();
        };


    }

}

export default Middleware;