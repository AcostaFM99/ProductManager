import { Mirouter } from "./router.js";
import Login from "../DAO/Login/Login.js";
import jwt from "jsonwebtoken";

const lg = new Login();


export class SessionRouter extends Mirouter{
    init(){
        this.get('/errorlogin',(req, res)=>{res.send('error login')});

        this.post('/registro',async(req,res)=>{await lg.registro(req,res)});

        this.post('/login',async(req,res)=>{let token =jwt.sign({email},'miPalabraSecreta'); await lg.Login(req,res)}); 
        this.get('/logout',async(req,res)=>{await lg.logout(req,res)});
    }
}
//this.post('/registro',async(req,res)=>{await lg.registro(req,res)});\


//