

const Middleware= {
    auth:(req,res,next)=>{
        //esto es para que no se pueda acceder al endpoint sin antes estar logueado
        if(!req.session.usuario) res.redirect('/login');
        next();
    },
    auth2:(req,res,next)=>{
        //esto es para que no se pueda acceder al endpoint estando logueado
        if(req.session.usuario) res.redirect('/api/products');
        next();
    }

}

export default Middleware;  