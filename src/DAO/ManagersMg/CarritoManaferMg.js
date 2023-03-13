
import { carritoModelo } from '../models/carritos.models.js';
import { productsModelo } from '../models/products.models.js';

export default class CarritoManagerMg{

    async getCarrito(req, res){
        let carrito
        try {
            carrito = await carritoModelo.find();
        } catch (error) {
            res.setHeader("Content-Type", "application/json");
            res.status(500).json({ Message: `No hay ningun carrito creado.` });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({
            carrito
        });
    }

    async CreateCarrito(req,res){
        carritoModelo.create(req.body);
        res.status(200).json({
            Message:`Carrito creado.`
        })
    }

    async CarritoById(req,res){
        let carrito
        let id = req.params.cid
        try {
         carrito = await carritoModelo.find({_id:id});
        } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.status(404).json({Message: `No se encontro el carrito bajo el id: ${id}.`})
        }   
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ Message: `Este es el carrito bajo el id: ${id}`,
            carrito
        })
    }

    async AddproductCarrito(req,res){
        res.setHeader("Content-Type", "application/json");
        let carritoByid = await carritoModelo.findById(req.params.cid);
        if(carritoByid){
            let productExist = carritoByid.products.findIndex((item)=> item.productId === req.params.pid);
            if(productExist !== -1){
                await carritoModelo.updateOne({ _id: req.params.cid,"products.productId":req.params.pid}, {$inc:{ "products.$.quantity": 1}});
            }else{
                await carritoModelo.updateOne({ _id: req.params.cid },{$push:{products:{productId: req.params.pid}}});
            }

            res.status(200).json({
                Menssage:`se agrego el producto bajo el id: ${req.params.pid} en el carrito id: ${req.params.cid}`
            })
        }else{
            res.status(400).json({error:`Carrito no encontrado.`});
        }



    }   

}