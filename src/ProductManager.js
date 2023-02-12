import fs from "fs";

class product{
    constructor(id, title, description, price, thumbnail, code, stock){
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    }
}

export default class ProductManager{
    constructor(path){

        this.path= path;
    }
    

    async getProduct(){
        if(fs.existsSync(this.path)){
            let lectura = await fs.promises.readFile(this.path,"utf-8");
            return JSON.parse(lectura);W
        }else{
            return[];
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock){
        let products = await this.getProduct();
        codeRepeat = products.find(products => products.code != code);
        content = (title && description && price && thumbnail && code && stock) != "" ;
        if(codeRepeat && content){
            let id = products.length++;
            let newProduct = new product(id, title, description, price, thumbnail, code, stock );
            product.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(product, null, 4));
        }else{
            console.log("error");
        }

    }


    async getProductById(id){
        let products = await this.getProduct();
        let productId = products.find(product=> product.id === id);
        if(productId != -1){
            let producto = products.find((product)=>product.title );
            console.log(producto);
        }else{
            console.log(`No hay producto con el ID: ${id}`);
        }
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock){
        let productos = await this.getProduct;
        let productoid = productos.find((product)=>product.id === id);
        if(productoid === id){
            productos[productoid].title = title;
            productos[productoid].description = description;
            productos[productoid].price = price;
            productos[productoid].thumbnail = thumbnail;
            productos[productoid].code = code;
            productos[productoid].stock = stock;
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null ,4));
        }
    }

    async DeleteProduct(id){
        let productos = await this.getProduct;
        let productoid = product.find((product)=>product.id === id);
        productos[productoid] = {};
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 4))
    }
}

