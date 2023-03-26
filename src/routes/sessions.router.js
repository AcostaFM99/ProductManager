import { Router } from "express";
import Login from "../DAO/Login/Login.js";

export const router=Router();

const lg = new Login();

router.post('/registro',async(req,res)=>{await lg.registro(req,res)});

router.post('/login',async(req,res)=>{await lg.Login(req,res)});

router.get('/logout',async(req,res)=>{await lg.logout(req,res)});

export default router;