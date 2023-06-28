import { Mirouter } from "./router.js";
import CarritoManagerMg from "../DAO/ManagersMg/CarritoManagerMg.js";



const cm = new CarritoManagerMg;
export class CarritoMgRouter extends Mirouter{
    init(){
        this.get("/", async(req, res)=>{await cm.getCarrito(req,res)});
        this.post("/", async(req, res)=>{await cm.CreateCarrito(req,res)});
        this.get("/:cid",async(req, res)=>{await cm.CarritoById(req,res)});
        this.post("/:cid/products/:pid",async(req,res)=>{await cm.AddproductCarrito(req,res)});
        this.delete("/:cid/products/:pid",async(req,res)=>{await cm.DeleteProductById(req,res)});
        this.put("/:cid/products/:pid",async(req,res)=>{await cm.ActualizarCantidad(req,res)});
        this.delete("/:cid",async(req,res)=>{await cm.DeleteAllProducts(req,res)})
    }
}
