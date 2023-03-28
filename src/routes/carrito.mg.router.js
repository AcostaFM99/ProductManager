import { Router } from "express";
import CarritoManagerMg from "../DAO/ManagersMg/CarritoManagerMg.js";

const router = Router();

const cm = new CarritoManagerMg;


router.get("/", async(req, res)=>{await cm.getCarrito(req,res)});
router.post("/", async(req, res)=>{await cm.CreateCarrito(req,res)});
router.get("/:cid",async(req, res)=>{await cm.CarritoById(req,res)});
router.post("/:cid/products/:pid",async(req,res)=>{await cm.AddproductCarrito(req,res)});
router.delete("/:cid/products/:pid",async(req,res)=>{await cm.DeleteProductById(req,res)});
router.put("/:cid/products/:pid",async(req,res)=>{await cm.ActualizarCantidad(req,res)});
router.delete("/:cid",async(req,res)=>{await cm.DeleteAllProducts(req,res)})
export default router;