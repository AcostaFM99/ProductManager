import { Router } from "express";
import { usuarioModelo } from "../DAO/models/usuarios.models.js";
import crypto from 'crypto';
import Login from "../DAO/Login/Login.js";

export const router=Router();

const lg = new Login();

router.post('/registro',async(req,res)=>{lg.registro});

router.post('/login',async(req,res)=>{lg.Login});

router.get('/logout',async(req,res)=>{lg.logout});

export default router;