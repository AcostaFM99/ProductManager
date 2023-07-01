import { Mirouter } from "./router.js";
import Middleware from "../Middleware/Middleware.js";
import Login  from "../DAO/controlDeLogin.js";

const Us = new Login()

export class ViewsRouter extends Mirouter{
    init(){
        this.get('/',['PUBLIC'],async(req, res)=>{})
        this.get('/realtimeproducts',['PUBLIC'], async(req, res)=>{
            res.render('realTimeProducts');
        });
        this.get('/api/products',['PUBLIC'],Middleware.auth,async(req,res)=>{let user = Us.RenderUser(req,res)
        });
        this.get('/chat',['PUBLIC'], async(req,res)=>{
            let style='chat.css'
            res.status(200).render('chat',{style});
        });
        this.get('/registro',['PUBLIC'],Middleware.auth2,async(req,res)=>{
            res.setHeader('Content-Type', 'text/html');
            res.render('registro');
        });
        this.get('/login',['PUBLIC'],Middleware.auth2, async(req,res)=>{
            res.setHeader('Content-Type', 'text/html');
            res.render('login');
        });
    }
}