import { Mirouter } from "./router.js";

export class usuariosRouter extends Mirouter{
    init(){
        this.get('/',(req,res)=>{
            res.send('Holis??? funcionara estop ?')
        })
    }
}