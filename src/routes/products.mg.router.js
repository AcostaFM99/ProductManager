import { Mirouter } from "./router.js";
import ProductManagerMg from "../DAO/ManagersMg/ProductManagerMg.js"
//import rolesModelo from "../DAO/models/roles.models.js"
import { usuarioModelo } from "../DAO/models/usuarios.models.js";

const mg = new ProductManagerMg;

export class ProductsMgRouter extends Mirouter{
    init(){
        this.get("/", async(req, res)=>{
            let pagina = await usuarioModelo.paginate({},{limit:4})
            console.log(pagina)

            let response = await mg.getProducts(req);
            if(response.status == "success"){
                res.status(200).json(response);
            }else{
                res.status(500).json(response);
            }
        });
        this.post("/", async(req,res)=>{await mg.addProducts(req,res)});
        this.get("/:pid", async(req, res)=>{await mg.getProductById(req,res)});
        this.put("/:pid", async(req, res)=>{await mg.updateProduct(req,res)});
        this.delete("/:pid", async(req,res)=>{await mg.deleteProduct(req,res)});
    }


}