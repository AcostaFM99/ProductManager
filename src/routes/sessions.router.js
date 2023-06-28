import { Mirouter } from "./router.js";
import Login from "../DAO/Login/Login.js";

const lg = new Login();


export class SessionRouter extends Mirouter{
    init(){
        this.get('/errorlogin',['PUBLIC'],(req, res)=>{res.send('error login')});

        this.post('/registro',['PUBLIC'],async(req,res)=>{await lg.registro(req,res)});

        this.post('/login',['PUBLIC'],async(req,res)=>{await lg.Login(req,res)});
        
        this.get('/logout',['PUBLIC'],async(req,res)=>{await lg.logout(req,res)});
    }
}
//this.post('/registro',async(req,res)=>{await lg.registro(req,res)});