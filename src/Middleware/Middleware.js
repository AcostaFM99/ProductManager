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

    midd2:(req, res, next)=>{
        if(fs.existsSync(rutaLog)){
            fs.appendFileSync(rutaLog,`- ATENCION....! Se han guardado datos en la DB`);
            
        }else{
            fs.writeFileSync(rutaLog,`- ATENCION....! Se han guardado datos en la DB`);
        }

        next(); 
    },
    middErrores:(error, req, res, next)=>{
        if(error){
            res.status(500).json({message: `Error interno en el servidor. Porfavor contacte al administrador`})
            fs.appendFileSync(rutaLog,`\n LOG: ${req.method} - ${req.url} - ${new Date().toUTCString()}`);
            fs.appendFileSync(rutaLog,`\n Descripcion del error: ${error}`);
        }else{
            next();
        };


    }

}

export default Middleware;