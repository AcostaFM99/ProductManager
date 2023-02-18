import fs from "fs";


class Carrito{
    constructor(id,productId =[]){
        this.id = id;
        this.productId = productId;
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
        let id = carrito.length ++;
        let newCarrito = new Carrito(id);
        carrito.push(newCarrito);
        await fs.promises.writeFile(this.path, JSON.stringify(carrito, null,4));
        return(id);

    }

    async carritoById(id){
        let carrito= await this.getCarrito();
        let carritoId = carrito.find(carrito => carrito.id === id);
        if(carritoId){
            let status = 200; 
            return(`Se creo el carrito correctamente bajo el id: ${carritoId}`,status);
        }else{
            let status = 400;
            return(`El carrito con el Id: ${id} ya existe`,status);
        }
    }

    async addProductCarrito (carritoId,product){
        let carrito = await this.getCarrito()
        let carritoIndex = carrito.findIndex(carrito=> carrito.id === carritoId);
        let carritoExist = carritoIndex === -1;
        if(carritoExist){
            let productIndex = carrito[carritoIndex].product.findIndex(p => p.product === product);
            let productExists = productIndex !== -1;
            if(productExists){
                carrito[carritoIndex].product[productIndex].quantity++;
                let status = 200; 
                await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 4));
                return(`Se agrego el producto correctamente, en el carrito con id: ${carritoIndex}`, status);
            }else{
                let status = 200; 
                carrito[carritoIndex].productId.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 4));
                return(`Se agrego el producto correctamente, en el carrito con id: ${carritoIndex}`, status);
            }
        }else{
            let status = 400;
            return(`El carrito con id: ${carritoId}, no existe, debe crear uno nuevo`, status);
        }
        

    }



}

