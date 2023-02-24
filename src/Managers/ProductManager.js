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
  
  async   addProducts(product) {
    let {title, description, code, price, status, stock, category, thumbnails} = product;
    let productos = await this.getProduct();
    let productoCreado = productos.findIndex((product) => product.code === code) !== -1;
    if (productoCreado) {
      console.log(`El producto ya existe`);
      return(true);
    } else {
    let id = createID();
    id = id.slice(1,6);
    status === "false" ? (status = true) : ``;
    let newProduct = new Product(id, title, description, code, price, status, stock, category, thumbnails);
    productos.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
    console.log(`Producto ${title} agregado bajo el id: ${id}`);
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
  async updateProduct(product) {
    let {id, title, description, code, price, status, stock, category, thumbnails} = product;
    let productos = await this.getProduct();
    let productIndex = productos.findIndex((product) => product.id === id);
    let productExists = productIndex !== -1;
    if (productExists) {
      status = true;
      productos[productIndex].title = title;
      productos[productIndex].description = description;
      productos[productIndex].price = price;
      productos[productIndex].thumbnail = thumbnails;
      productos[productIndex].stock = status;
      productos[productIndex].stock = stock;
      productos[productIndex].stock = category;
      await fs.promises.writeFile(this.path,JSON.stringify(productos, null, 2));
      console.log(`El producto ${title} con el id: ${id} se actualizo correctamente`);
    } else {
      console.log("Producto no encontrado.");
    }
  }

  async deleteProduct(id) {
    let productos = await this.getProduct();
    let productIndex = productos.findIndex((product) => product.id === id);
    let productExists = productIndex !== -1;
    if (productExists) {
      productos[productIndex] = {};
      await fs.promises.writeFile(this.path,JSON.stringify(productos, null, 2));
      console.log(`El producto con el id ${id} se borro correctamente`);
      return(true);
    } else {
      console.log("Producto no encontrado.");
      return(false);
    }
  }
}



// let p = new ProductManager('../files/products.json');
// p.getProduct().then(product => console.log(product));
// p.addProducts("producto prueba1", "Este es un producto prueba1", 20, "Sin imagen", "code128", 25);
// p.getProduct().then(products => console.log(products));
// p.getProductById(1);
//p.deleteProduct(3);
