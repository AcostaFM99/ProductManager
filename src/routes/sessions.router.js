import { Mirouter } from "./router.js";
import Login from "../DAO/Login/Login.js";

const lg = new Login();

export class SessionRouter extends Mirouter{
    init(){
        //endpoint de prueba para el privilegio de Admin, me tira error :Cannot read properties of undefined (reading 'toOppercase'):
        this.get('/datos',['ADMIN'],(req,res)=>{
            res.success("todo ok admin");
        });
        this.post('/login',['PUBLIC'], async(req,res)=>{await lg.Login(req,res)}); 
        this.post('/registro',['PUBLIC'],async(req,res)=>{await lg.registro(req,res)});
        this.get('/errorlogin',['PUBLIC'],(req, res)=>{res.send('error login')});
        this.get('/logout',['PUBLIC'],async(req,res)=>{await lg.logout(req,res)});
    }
}

