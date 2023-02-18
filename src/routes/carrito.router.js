import { Router } from "express"; 
import CarritoManager from "../Managers/CarritoManager.js";

const router = Router();
let cr = new CarritoManager('../../files/carrito.json')


router.post('/',async (req,res)=>{
    res.setHeader('Content-Type','application/json');
    let carritoId = await cr.CreateCarrito();
    res.status(200).json({Message:`Se creo el carrito correctamente bajo el id: ${carritoId}`});
});

router.get('/:cid',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    let Id = req.params.cid
    let respuesta = cr.carritoById(Id);
    if(respuesta == 200){
        res.status(200).json({respuesta});
    }else{
        res.status(400).json({respuesta})
    }
    
});

router.post('/:cid/product/:pid',async(req,res)=>{
    res.setHeader('Content-Type','application/json');
    let carritoId = req.params.cid;
    let productId = req.params.pid;
    let respuesta = await cr.addProductCarrito(carritoId,productId);
    
    if(respuesta == 200){
        res.status(200).json({respuesta});
    }else{
        res.status(400).json({respuesta})
    }
});

export default router;