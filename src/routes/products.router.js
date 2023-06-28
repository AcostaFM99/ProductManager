import ProductManager from "../DAO/ManagersFs/ProductManager.js";
import { __dirname } from "../utils.js";
import upload from "../utils.js";
import { Mirouter } from "./router.js";



let pm = new ProductManager(__dirname+"/files/products.json");

export class ProductsRouter extends Mirouter{
    init(){
        this.get("/", async (req, res) => {
            let limit = req.query.limit;
            let products = await pm.getProduct();
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ products: products.slice(0, limit) });
        });

        this.get("/:pid", async (req, res) => {await pm.getProductById(req,res)});
        this.post("/",upload.single('thumbnails'), async (req, res)=>{await pm.addProducts(req,res);});
        this.put('/:pid',async (req,res)=>{await pm.updateProduct(req, res);});
        this.delete('/:pid',async (req,res)=>{ await pm.deleteProduct(req,res);});

    }
}
