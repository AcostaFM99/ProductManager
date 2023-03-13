import { Router } from "express";
import CarritoManagerMg from "../DAO/ManagersMg/CarritoManaferMg.js";

const router = Router();

const cm = new CarritoManagerMg;


router.get("/", async(req, res)=>{await cm.getCarrito(req,res)});
router.post("/", async(req, res)=>{await cm.CreateCarrito(req,res)});
router.get("/:cid",async(req, res)=>{await cm.CarritoById(req,res)});
router.post("/:cid/product/:pid",async(req,res)=>{await cm.AddproductCarrito(req,res)});


export default router;