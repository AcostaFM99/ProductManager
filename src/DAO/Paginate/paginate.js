import { productsModelo } from "../models/products.models.js";




export default class paginate{
        


    async pag(req,res){

        let limit = req.query.limit;
        limit?  limit = req.query.limit : limit = 10;
        let page = req.query.page;
        let query = req.query.query;
        let sort = parseInt(req.query.sort);
        let productos = await productsModelo.paginate();
        console.log(productos)
        


        if(query){
            if(sort){
                //Falta la parte del query
                let productos = await productsModelo.paginate({},{page:page,limit:limit,sort:{price:sort}});
                let {totalPages, hasPrevPage,hasNextPage,prevPage,nextPage}=productos;
                res.render('home',{
                    productos:productos.docs,
                    totalPages, hasPrevPage,hasNextPage,prevPage,nextPage
                    
                });
            }else{
                //falta la parte del query
                let productos = await productsModelo.paginate({},{page:page,limit:limit});
                let {totalPages, hasPrevPage,hasNextPage,prevPage,nextPage}=productos;
                res.render('home',{
                    productos:productos.docs,
                    totalPages, hasPrevPage,hasNextPage,prevPage,nextPage
                });
            } 
        }else{
            if(sort){
                let productos = await productsModelo.paginate({},{page:page,limit:limit,sort:{price:sort}});
                let {totalPages, hasPrevPage,hasNextPage,prevPage,nextPage}=productos;
                res.render('home',{
                    productos:productos.docs,
                    totalPages, hasPrevPage,hasNextPage,prevPage,nextPage
                });
            }else{
                let productos = await productsModelo.paginate({},{limit:limit,page:page});
                let {totalPages, hasPrevPage,hasNextPage,prevPage,nextPage}=productos;
                res.render('home',{
                    productos:productos.docs,
                    totalPages, hasPrevPage,hasNextPage,prevPage,nextPage
                });
            }
            
        }



    }







}