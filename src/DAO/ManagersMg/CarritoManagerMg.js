
import mongoose from 'mongoose';
import { carritoModelo } from '../models/carritos.models.js';

export default class CarritoManagerMg{

    async getCarrito(){
        let carrito = await carritoModelo.find();
        return  carrito;
    }

    async CreateCarrito(req,res){
        carritoModelo.create(req.body);
        res.status(200).json({
            Message:`Carrito creado.`
        })
    }

    async CarritoById(req,res){
        let carrito
        try {
         carrito = await carritoModelo.find({_id:req.params.cid});
        } catch (err) {
            res.setHeader("Content-Type", "application/json");
            res.status(404).json({Message: `No se encontro el carrito bajo el id: ${id}.`})
        }   
        res.render('cart.handlebars',{carrito})
    }

    async AddproductCarrito(req,res){
        
        let carritoByid = await carritoModelo.findOne({_id:req.params.cid});
        let carritoIndex= carritoByid.producto.findIndex(p=>p.product==req.params.pid);
        if(carritoIndex == -1){
            carritoByid.producto.push({product:req.params.pid,quantity:1});
            await carritoModelo.updateOne({ _id: req.params.cid },carritoByid);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ Message: `Producto agregado al carrito`});
        }else{
            carritoByid.producto[carritoIndex].quantity ++
            await carritoModelo.updateOne({ _id: req.params.cid },carritoByid);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ Message: `Producto agregado al carrito`});
        }


    }  
 
    async DeleteProductById(req,res){
        let carritoByid = await carritoModelo.findOne({_id:req.params.cid});
        let carritoIndex= carritoByid.producto.findIndex(p=>p.product==req.params.pid);
        if(carritoIndex == -1){
            res.setHeader("Contente-Type","aplicatiom/json");
            res.status(401).json({
                error:`Producto no encontrado en el carrito ${req.params.cid}`
            });
        }else{
            carritoByid.producto[carritoIndex]={}
            await carritoModelo.updateOne({ _id: req.params.cid },carritoByid);
            res.setHeader("Contente-Type","aplicatiom/json");
            res.status(200).json({
                error:`Producto eliminado del carrito: ${req.params.cid}`
            });
        }

    }

    async ActualizarCantidad(req,res){
        let cantidad = req.body;
        let carritoByid = await carritoModelo.findOne({_id:req.params.cid});
        let carritoIndex= carritoByid.producto.findIndex(p=>p.product==req.params.pid);

        if(carritoIndex){
            res.setHeader("Contente-Type","aplicatiom/json");
            res.status(401).json({
                error:`Producto no encontrado en el carrito ${req.params.cid}`
            });
        }else{
            carritoByid.producto[carritoIndex].quantity=cantidad;
            await carritoModelo.updateOne({ _id: req.params.cid },carritoByid);
            res.setHeader("Contente-Type","aplicatiom/json");
            res.status(200).json({
                error:`Cantidad actualizada`
            });
        }
        
    }

    async DeleteAllProducts(req, res){
        let carritoByid = await carritoModelo.findOne({_id:req.params.cid});

        if(carritoByid){
            carritoByid.producto={};
            await carritoModelo.updateOne({ _id: req.params.cid },carritoByid);
            res.setHeader("Contente-Type","aplicatiom/json");
            res.status(200).json({
                error:`Se eliminaron los productos del carrito ${req.params.cid}`
            });
            
        }else{
            res.setHeader("Contente-Type","aplicatiom/json");
            res.status(401).json({
                error:`No se encontro el carrito: ${req.params.cid}`
            });
        }
    }

    
}