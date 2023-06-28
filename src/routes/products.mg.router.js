import { Mirouter } from "./router.js";
import ProductManagerMg from "../DAO/ManagersMg/ProductManagerMg.js"

const mg = new ProductManagerMg;

export class ProductsMgRouter extends Mirouter{
    init(){
        this.get("/",['PUBLIC'], async(req, res)=>{
            let response = await mg.getProducts(req);
            if(response.status == "success"){
                res.status(200).json(response);
            }else{
                res.status(500).json(response);
            }
        });
        this.post("/",['ADMIN'], async(req,res)=>{await mg.addProducts(req,res)});
        this.get("/:pid",['PUBLIC'], async(req, res)=>{await mg.getProductById(req,res)});
        this.put("/:pid",['ADMIN'], async(req, res)=>{await mg.updateProduct(req,res)});
        this.delete("/:pid",['ADMIN'], async(req,res)=>{await mg.deleteProduct(req,res)});
    }


}