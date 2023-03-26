import { Router } from "express";
import ProductManagerMg from "../DAO/ManagersMg/ProductManagerMg.js"



const router = Router();


const mg = new ProductManagerMg;


router.get("/", async(req, res)=>{await mg.getProducts(req)});
router.post("/", async(req,res)=>{await mg.addProducts(req,res)});
router.get("/:pid", async(req, res)=>{await mg.getProductById(req,res)});
router.put("/:pid", async(req, res)=>{await mg.updateProduct(req,res)});
router.delete("/:pid", async(req,res)=>{await mg.deleteProduct(req,res)});



export default router;