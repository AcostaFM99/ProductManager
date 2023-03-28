import { v4 as createID } from "uuid";
import {productsModelo} from "../models/products.models.js"



export default class ProductManagerMg{


    async getProducts(req){

        let { category, status, limit, page, sort } = req.query;
        let query = {};
        let options = {limit: 10, page: 1};
        let params = [];
        let response = {};
        if(category){
            (query.category = category);
            params.push(`category=${category}`);
        };
        if(status){
            (query.status = status)
            params.push(`status=${status}`);
        };
        if(limit){
            (options.limit = limit)
            params.push(`limit=${limit}`);
        };

        if(page){
            (options.page = page);
        };

        if(sort){
            (options.sort = { price: sort })
            params.push(`sort=${sort}`);
        };
        try {
            let productos = await productsModelo.paginate(query, options);
            let { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = productos;
            response.status = "success";
            response.payload = docs;
            response.totalPages = totalPages;
            response.prevPage = prevPage;
            response.nextPage = nextPage;
            response.page = page;
            response.hasPrevPage = hasPrevPage;
            response.hasNextPage = hasNextPage;

            if (hasPrevPage) {
                response.prevLink = `/api/products/?page=${prevPage}`
                if (params.length){
                    for (let i = 0; i < params.length; i++) {
                        response.prevLink += `&${params[i]}`
                    }
                }
            } else{
                response.prevLink = null;
            }
            if (hasNextPage) {
                response.nextLink = `/api/products/?page=${nextPage}`
                if (params.length){
                    for (let i = 0; i < params.length; i++){
                        response.nextLink += `&${params[i]}`
                    }
                }
            }else{
                response.nextLink = null;
            }
            return response;

        }catch(error){
            response.status = "error";
            return response;
        }







    };

    async addProducts(req,res){
        let {title, description, code, price, status, stock, category, thumbnails} = req.body;
        let camposVacios = !title || !description || !code || !price || !status || !stock || !category || !thumbnails;
        if(camposVacios){
            res.status(400).json({ error: "faltan campos por completar." });
        }else{
            let products = await productsModelo.find();
            let productExists = products.findIndex((product) => product.code === code) !== -1;
            if(productExists){
                res.setHeader("Content-Type", "application/json");
                return res.status(400).json({message: `El producto que intenta agregar, ya existe.`})
            }else{
                let id = createID();
                id = id.slice(0,7);
                status === "false" ? (status = true) : ``;
                let productoAgregado = await productsModelo.create({id, title, description, code, price, status, stock, category, thumbnails});
                res.setHeader("Content-Type", "application/json");
                return res.status(201).json({
                    message:`El producto se agreco correctamente a la base de datos...!!`
                });
            };
        };

    };

    async getProductById (req,res){
        let id = req.params.pid;
        let product = await productsModelo.find();
        let productId = product.find((product) => product.id == id);
        let idEncontrado = await productsModelo.find({_id:id});
        let productIdIndex = productId != -1;
        if (productIdIndex){
            res.setHeader("Content-Type", "application/json");
            return res.status(200).json({message:`Producto encontrado bajo el id: ${id}. ${idEncontrado}`});
          } else {
            res.setHeader("Content-Type", "application/json");
            return res.status(404).json({message:`No hay producto con el ID: ${id}`});
          };
    };

    async updateProduct(req,res){
        let id = req.params.pid;
         let idEncontrado = await productsModelo.find({_id:id});
        if(idEncontrado != ''){
            let productModific = await productsModelo.updateOne({_id:id},req.body);
            return res.status(200).json({productModific});
        }else{
            return res.status(404).json({message:`No hay producto con el ID: ${id}`});
        }
    };


    async deleteProduct(req,res){
        let id = req.params.pid;
        let idEncontrado = await productsModelo.find({_id:id});
       if(idEncontrado != ''){
           let productModific = await productsModelo.deleteOne({_id:id},req.body);
           return res.status(200).json({productModific});
       }else{
           return res.status(404).json({message:`No hay producto con el ID: ${id}`});
       }
    };


    

}

