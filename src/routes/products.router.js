import { Router } from "express"; 
import ProductManager from "../Managers/ProductManager.js";
import { __dirname } from "../utils.js";
import upload from "../utils.js";

const router = Router();
let pm = new ProductManager(__dirname+"/files/products.json");

router.get("/", async (req, res) => {
    let limit = req.query.limit;
    let products = await pm.getProduct();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ products: products.slice(0, limit) });
});
  
router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    let product = await pm.getProductById(id);
    let productIndex = product != -1;
    res.setHeader("Content-Type", "application/json");
    if (productIndex) {
      res.status(200).json({ message:`Este es el producto bajo el id: ${id}`,product });
    } else {
      res.status(400).json({ error: "el producto no existe" });
    }
});
  
router.post("/",upload.single('thumbnails'), async (req, res) => {
    let product = req.body;
    let productExists = await pm.addProducts(product)
    res.setHeader("Content-Type", "application/json");
    if ( !product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnails) {
      console.log(`Faltan campos por completar.`);
      res.status(400).json({ error: "faltan campos por completar." });
    }else{
      if(productExists){
        res.status(400).json({error: `El producto ya existe.`});
        } else {
        product = await pm.addProducts(product);
        res.status(201).json({ message: `Se agrego correctamtene el producto.`});
        }
    }
    
});
  
router.put('/:pid',async (req,res)=>{
    let id = req.params.pid;
    let updateProduct = req.body;
    res.setHeader('Content-Type','application/json');
    if(!updateProduct){
      res.status(400).json({error: "No hay nada que actualizar."})
    }else{
      let product = await pm.getProductById(id);
      product = await pm.updateProduct(updateProduct);
      res.status(200).json({message: `El producto con id: ${id} se actualizo correctamente.` });
    };
});
  
router.delete('/:pid',async (req,res)=>{
    let id = req.params.pid;
    res.setHeader('Content-Type','application/json');
    let productoDelete=pm.deleteProduct(id);
    if(productoDelete){
      res.status(200).json({message:`El producto con id: ${id} fue eliminado con exito!`});
    }else{
      res.status(400).json({error:`El producto con id: ${id} no se encontro, no existe o no se pudo eliminar`});
    };
});
  

export default router;