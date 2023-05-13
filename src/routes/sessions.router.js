import { Router } from "express";
import Login from "../DAO/Login/Login.js";
import passport from "passport";

export const router=Router();

const lg = new Login();

router.get('/errorlogin',(req, res)=>{
    res.send('error login')
})

router.post('/registro',async(req,res)=>{await lg.registro(req,res)});

router.post('/login',async(req,res)=>{await lg.Login(req,res)});

router.get('/logout',async(req,res)=>{await lg.logout(req,res)});

export default router;