import { Console } from "console";
import fs from "fs";

class Product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
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
  async addProducts(title, description, price, thumbnail, code, stock) {
    let productos = await this.getProduct();
    let productoCreado = productos.findIndex((product) => product.code === code) !== -1;
    let contenidoBasio = !(title && description && price && thumbnail && code && stock);
    if (productoCreado || contenidoBasio) {
      console.log(`El producto ya existe`);
    } else {
    let id = productos.length + 1;
    let newProduct = new Product(id,title,description,price,thumbnail,code,stock);
    productos.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
    console.log(`Producto ${title} agregado bajo el id: ${id}`);
    }
  }

  async getProductById(id) {
    let products = await this.getProduct();
    let productId = products.find((product) => product.id === id);
    if (productId) {
      console.log(productId);
    } else {
      console.log(`No hay producto con el ID: ${id}`);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    let productos = await this.getProduct();
    let productIndex = productos.findIndex((product) => product.id === id);
    let productExists = productIndex !== -1;
    if (productExists) {
      productos[productIndex].title = title;
      productos[productIndex].description = description;
      productos[productIndex].price = price;
      productos[productIndex].thumbnail = thumbnail;
      productos[productIndex].code = code;
      productos[productIndex].stock = stock;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productos, null, 2)
      );
      console.log(
        `El producto ${title} con el id: ${id} se actualizo correctamente`
      );
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
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productos, null, 2)
      );
      console.log(`El producto con el id ${id} se borro correctamente`);
    } else {
      console.log("Producto no encontrado.");
    }
  }
}

// let p = new ProductManager('../files/products.json');
// p.getProduct().then(product => console.log(product));
// p.addProducts("producto prueba1", "Este es un producto prueba1", 20, "Sin imagen", "code128", 25);
// p.getProduct().then(products => console.log(products));
// p.getProductById(1);
//p.deleteProduct(3);
