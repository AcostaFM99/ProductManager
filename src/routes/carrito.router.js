import { Mirouter } from "./router.js";
import CarritoManager from "../DAO/ManagersFs/CarritoManager.js";
import {__dirname} from "../utils/utils.js";


let cr = new CarritoManager(__dirname+'/files/carrito.json')

export class CarritoRouter extends Mirouter{
    init(){

        this.post('/',async (req,res)=>{
            res.setHeader('Content-Type','application/json');
            let carritoId = await cr.CreateCarrito();
            res.status(200).json({Message:`Se creo el carrito correctamente bajo el id: ${carritoId}`});
        });
        this.get('/:cid',async(req,res)=>{
            res.setHeader('Content-Type','application/json');
            let Id = req.params.cid
            let respuesta = await cr.carritoById(Id);
            if(respuesta[1] == 200){
                res.status(200).json([respuesta[0]]);
            }else{
                res.status(400).json([respuesta[0]]);
            }
            
        });
        this.post('/:cid/product/:pid',async(req,res)=>{
            res.setHeader('Content-Type','application/json');
            let carritoId = req.params.cid;
            let productId = req.params.pid;
            let respuesta = await cr.addProductCarrito(carritoId,productId);
            switch (respuesta[1]) {
                case 200:
                    res.status(200).json({respuesta:respuesta[0],});
                    break;
                case 400:
                    res.status(400).json({respuesta:respuesta[0],});
                    break;
                default:
                    res.status(404).json({respuesta:respuesta[0],});
                    break;
            };
        });

    }
}
