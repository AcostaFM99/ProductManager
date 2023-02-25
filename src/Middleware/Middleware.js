import fs from "fs";


const Middleware= {
    middErrores:(error, req, res, next)=>{
        if(error){
            res.status(500).json({
                message: `Error interno en el servidor. Porfavor contacte al administrador`
            })

        }else{
            next();
        };


    }




}

export default Middleware;