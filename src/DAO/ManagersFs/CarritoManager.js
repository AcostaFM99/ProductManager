import fs from "fs";
import { v4 as createID } from "uuid";
import { __dirname } from "../../utils.js";
import ProductManager from "./ProductManager.js";

let pm = new ProductManager(__dirname+"/files/products.json");
class Carrito{
    constructor(id,productId =[]){
        this.id = id;
        this.product = productId;
    }

}


export default class CarritoManager{
    constructor(path){
        this.path = path;
    }

    async getCarrito() {
        if (fs.existsSync(this.path)) {
          let lectura = await fs.promises.readFile(this.path, "utf-8");
          return JSON.parse(lectura);
        } else {
          return [];
        }
    }

    async CreateCarrito (){
        let carrito = await this.getCarrito();
        let id = createID();
        id = id.slice(1,6);
        let newCarrito = new Carrito(id);
        carrito.push(newCarrito);
        await fs.promises.writeFile(this.path, JSON.stringify(carrito, null,4));
        return(id);

    }

    async carritoById(id){
        let carrito= await this.getCarrito();
        let carritoById = carrito.find(carrito => carrito.id == id);
        let carritoIndex = carritoById != -1;
        if(carritoIndex){
            let status = 200; 
            return[`Este es el carrito bajo id: ${id} ${carritoById}`,status];
        }else{
            let status = 400;
            return[`El carrito con el Id:${id}, no existe`,status];
        }
    }

    async addProductCarrito (carritoId,product){
        let carrito = await this.getCarrito();
        let carritoIndex = carrito.findIndex(carrito=> carrito.id == carritoId);
        let carritoExist = carritoIndex != -1;
        let productos = await pm.getProduct();
        let productIndex = productos.findIndex((p) => p.id == product);
        let productExists = productIndex !== -1;
        if(carritoExist){
            if(productExists){
                let productIndex = carrito[carritoIndex].product.findIndex(p => p.product == product);
                let productExistsCar = productIndex !== -1;
                if(productExistsCar){
                    carrito[carritoIndex].product[productIndex].quantity++;
                    let status = 200; 
                    await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 4));
                    return[`Se agrego el producto correctamente, en el carrito con id: ${carritoId}`, status];
                }else{
                    let status = 200; 
                    carrito[carritoIndex].product.push({product, quantity:1});
                    await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 4));
                    console.log(`Se agrego el producto correctamente, en el carrito con id: ${carritoId}`);
                    return[`Se agrego el producto correctamente, en el carrito con id: ${carritoId}`, status];
                }
            }else{
                let status= 404;
                console.log(`El producto que inteta agregar es inexistente en la base de datos.`);
                return[`El producto que inteta agregar es inexistente en la base de datos.`, status];
            }
        }else{
            let status = 400;
            console.log(`El carrito con id: ${carritoId}, no existe, debe crear uno nuevo`);
            return[`El carrito con id: ${carritoId}, no existe, debe crear uno nuevo`, status];
        }
        

    }



}

