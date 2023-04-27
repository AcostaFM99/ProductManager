
export default class Login{


    async registro(req,res){
        res.redirect('/login');        
    }

    async Login(req,res){
      
        req.session.usuario={
            nombre:req.user.nombre,
            apellido:req.user.apellido,
            email:req.user.email,
            edad:req.user.edad
        }
        res.redirect('/api/products');
    }

    async logout(req,res){
        req.session.destroy((error)=>{
            if(error){
                return res.sendStatus(500);
            }else{
              res.redirect('/login');
            }
          });
    }








}