import { Router } from "express"; 
import ProductManager from "../DAO/ManagersFs/ProductManager.js";
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


router.get("/:pid", async (req, res) => {await pm.getProductById(req,res)});
router.post("/",upload.single('thumbnails'),Middleware.midd1,Middleware.midd2, async (req, res)=>{await pm.addProducts(req,res);});
router.put('/:pid',async (req,res)=>{await pm.updateProduct(req, res);});
router.delete('/:pid',async (req,res)=>{ await pm.deleteProduct(req,res);});
  

export default router;