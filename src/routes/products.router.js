import { Router } from "express"; 
import ProductManager from "../Managers/ProductManager.js";
import { __dirname } from "../utils.js";
import upload from "../utils.js";
import Middleware from "../Middleware/Middleware.js";


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
  
router.post("/",upload.single('thumbnails'),Middleware.midd1, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    let camposVacios = !title && description && code && price && status && stock && category && thumbnails
    if ( camposVacios) {
      console.log(`Faltan campos por completar.`);
      res.status(400).json({ error: "faltan campos por completar." });
    }else{
        await pm.addProducts(req,res);
    }
    
});
  
router.put('/:pid',async (req,res)=>{await pm.updateProduct(req, res);});

router.delete('/:pid',async (req,res)=>{ await pm.deleteProduct(req,res);});
  

export default router;