import { v4 as createID } from "uuid";
import fs from "fs";

class Product {
  constructor(id, title, description, code, price, status, thumbnail, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status
    this.stock = stock;
    this.thumbnail = thumbnail;
  
  }
}

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }


  async getProduct() {
    if (fs.existsSync(this.path)) {
      let lectura = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(lectura);
    } else {
      return [];
    }
  }
  
  async addProducts(req,res) {
    res.setHeader("Content-Type", "application/json");
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    let products = await this.getProduct();
    let productExists = products.findIndex((product) => product.code === code) !== -1;
    if(productExists){
      console.log('error: El producto que intenta agregar, ya existe.');
      return res.status(400).json({ message: `El producto que intenta agregar, ya existe.` });
    }else{
      let productos = await this.getProduct();
      let id = createID();
      id = id.slice(0,7);
      status === "false" ? (status = true) : ``;
      let newProduct = new Product(id, title, description, code, price, status, stock, category, thumbnails);
      productos.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
      console.log(`Producto ${title} agregado bajo el id: ${id}`);
      return res.status(400).json({ message: `Producto ${title} agregado bajo el id: ${id}` });
    }



  }

  async getProductById(id) {
    let products = await this.getProduct();
    let productId = products.find((product) => product.id === id) ;
    let productIdIndex = productId != -1;
    if (productIdIndex) {
      console.log(productId);
      return(productId);
    } else {
      console.log(`No hay producto con el ID: ${id}`);
    }
  }


  // tengo que arreglar esta funcion
  //id, title, description, price, thumbnail, code, stock
  async updateProduct(req,res) {
    res.setHeader("Content-Type", "application/json");
    let id = req.params.pid;
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    let productos = await this.getProduct();
    let productIndex = productos.findIndex((p) => p.id === id);
    let productExists = productIndex !== -1;
    if (productExists) {
      status = true;
      productos[productIndex].title = title;
      productos[productIndex].description = description;
      productos[productIndex].price = price;
      productos[productIndex].thumbnails = thumbnails;
      productos[productIndex].stock = status;
      productos[productIndex].stock = stock;
      productos[productIndex].stock = category;
      await fs.promises.writeFile(this.path,JSON.stringify(productos, null, 2));
      console.log(`El producto ${title} con el id: ${id} se actualizo correctamente`);
      return res.status(200).json({message: `El producto ${title} con el id: ${id} se actualizo correctamente`});
    } else {
      console.log( `error: El producto bajo el id:${id} no existe en la base de datos.`);
      return res.status(404).json({error: `El producto bajo el id:${id} no existe en la base de datos.` });
    }
  }

  async deleteProduct(req, res) {
    res.setHeader('Content-Type','application/json');
    let id = req.params.pid;
    let productos = await this.getProduct();
    let productIndex = productos.findIndex((product) => product.id === id);
    let productExists = productIndex !== -1;
    if (productExists) {
      productos[productIndex] = {};
      await fs.promises.writeFile(this.path,JSON.stringify(productos, null, 2));
      console.log(`El producto con el id ${id} se borro correctamente`);
      return res.status(200).json({message:`El producto con id: ${id} fue eliminado con exito!`});
    } else {
      console.log("Producto no encontrado.");
      return res.status(400).json({error:`El producto con id: ${id} no se encontro, no existe o no se pudo eliminar`});
    }
  }
}



// let p = new ProductManager('../files/products.json');
// p.getProduct().then(product => console.log(product));
// p.addProducts("producto prueba1", "Este es un producto prueba1", 20, "Sin imagen", "code128", 25);
// p.getProduct().then(products => console.log(products));
// p.getProductById(1);
//p.deleteProduct(3);
