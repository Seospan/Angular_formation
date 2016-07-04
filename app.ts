import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core'

class Product {
  title: string;
  link: string;
  votes: number;

  constructor(
      public sku: string,
      public name: string,
      public imageUrl: string,
      public department: string[],
      public price: number) {
      this.votes = 0;
  }

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }

}

class Cart{
    products : Product[];

    constructor(){
        this.products = [];
    }

    addProduct(product:Product){
        this.products.push(product);
    }
}

/**
* @ProductImage: A component to show a single Product's image
*/
@Component({
    selector: 'product-image',
    host: {class: 'ui small image'},
    inputs: ['product'],
    template: `
    <img class="product-image" [src]="product.imageUrl" />
    `
})
class ProductImage{
    product = Product;
}

/**
* @ProductVotes:
*/
@Component({
    selector: 'product-votes',
    host: {class: 'product-votes'},
    inputs: ['product'],
    template: `
    <br />
    <div>Votes : {{ product.votes }}</div>
    `
})
class ProductVotes{
    product = Product;
}

/**
 * @ProductDepartment: A component to show the breadcrumbs to a
 * Product's department
 */
@Component({
    selector: 'product-department',
    inputs: ['product'],
    template: `
    <span
        *ngFor="let name of product.department; let i=index, let last = last"
     >
    <a href="#">{{ name }}</a>
    <span>{{i < (product.department.length-1) ? '>' : '' }}</span>
    <span *ngIf="last==false"> > </span>
    </span>
    `
})
class ProductDepartment{
    product = Product;
}

/**
 * @PriceDisplay : A component to show the price of a
 * Product
 */
@Component({
    selector: 'price-display',
    inputs: ['price'],
    template: `
    <div class="price-display">\${{ price }}</div>
    `
})
class PriceDisplay{
    product = Number;
}

/**
* @ProductRow: A component for the view of single Product
*/
@Component({
    selector: 'product-row',
    directives: [ProductImage, ProductDepartment, PriceDisplay, ProductVotes],
    inputs: ['product'],
    outputs: ['onProductAdded'],
    host: {'class' : 'item'},
    template:`
    <product-image [product]="product"></product-image>
    <div class="content">
        <div class="header">{{ product.name }}</div>
        <div class="meta">
            <div class="product-sku">SKU #{{ product.sku }}</div>
        </div>
        <div class="description">
            <product-department [product]="product"></product-department>
        </div>
    </div>
    <price-display [price]="product.price"></price-display>
    <product-votes [product]="product"></product-votes>
    <div (click)="clicked(clickedProduct)" class="addToCart">ADD TO CART</div>
    `
})
class ProductRow {
    product = Product;
    onProductAdded: EventEmitter<Product>;

    constructor() {
        this.onProductAdded = new EventEmitter();
    }

    clicked(clickedProduct : Product){
        this.onProductAdded.emit(clickedProduct);
    }
}

/**
* @CartRow: A component for the view of single Product
*/
@Component({
    selector: 'cart-row',
    directives: [ProductImage, ProductDepartment, PriceDisplay, ProductVotes],
    inputs: ['product'],
    host: {'class' : 'item'},
    template:`
        <div class="cart-line">{{ product.name }}
        <price-display [price]="product.price"></price-display>
        </div>
    `
})
class CartRow {
    product = Product;
    onProductAdded: EventEmitter<Product>;

    constructor() {
        this.onProductAdded = new EventEmitter();
    }


}

/**
* @Cart
*/
@Component({
    selector: 'shopping-cart',
    directives: [CartRow],
    inputs: ['cart'],
    host: {class: 'cart'},
    template: `
    <div style="border:1px solid black; width:100%; min-height:50px;">Cart : </div>
    <cart-row
        *ngFor="let product of cart.products"
        [product]="product"
    ></cart-row>
    `
})
class ShoppingCart{
    cart:Cart;
    countedCart:Object;

}

/**
* @ProductBig: A component for the view of single Product
*/
@Component({
    selector: 'product-big',
    directives: [ProductImage, ProductDepartment, PriceDisplay, ProductVotes],
    inputs: ['product:selectedProduct'],
    host: {'class' : 'big'},
    template:`
    <product-image [product]="product"></product-image>
    <div class="content">
        <div class="header">{{ product.name }}</div>
        <div class="meta">
            <div class="product-sku">SKU #{{ product.sku }}</div>
        </div>
        <div class="description">
            <product-department [product]="product"></product-department>
        </div>
    </div>
    <price-display [price]="product.price"></price-display>
    <product-votes [product]="product"></product-votes>
    <div (click)="product.voteUp()" class="buttonPlus">+++</div>
    <div (click)="product.voteDown()" class="buttonMoins">---</div>
    `
})
class ProductBig {
    product = Product;
}


@Component({
    selector: 'products-list',
    directives: [ProductRow],
    inputs: ['productList'],
    outputs: ['onProductSelected','addProductToCart'],
    template: `
    <div class="ui items">
        <product-row
            *ngFor="let myProduct of productList"
            [product]="myProduct"
            (click)='clicked(myProduct)'
            (onProductAdded)="addProductToCartFct(myProduct)"
            [class.selected]="isSelected(myProduct)">
        </product-row>
    </div>
    `
})
class ProductsList {

    /**
    * @input productList - the Product[] passed to us
    */
    productList: Product[];

    /**
    * @ouput onProductSelected - outputs the current
    * Product whenever a new Product is selected
    */
    onProductSelected: EventEmitter<Product>;

    addProductToCart: EventEmitter<Product>;

    /**
    * @property currentProduct - local state containing
    * the currently selected `Product`
    */
    currentProduct: Product;

    constructor() {
        this.onProductSelected = new EventEmitter();
        this.addProductToCart = new EventEmitter();
    }

    clicked(product: Product): void {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
        //this.addProductToCart.emit(product);
    }

    isSelected(product: Product): boolean{
        if(!product || !this.currentProduct){
            return false;
        }

        return product.sku === this.currentProduct.sku;
    }

    addProductToCartFct(product: Product): void{
        this.addProductToCart.emit(product);
    }
}


@Component({
  selector: 'inventory-app',
  directives: [ProductsList, ProductBig, ShoppingCart],
  template: `<div class="inventory-app">
            <shopping-cart [cart]="cart"></shopping-cart>
            <products-list [productList]="products" (onProductSelected)="productWasSelected($event)" (addProductToCart)="productWasAdded($event)">           
            </products-list>     
            <product-big [selectedProduct]="currentProduct" *ngIf="currentProduct"></product-big>
  `
})
class InventoryApp {

  products: Product[];
  currentProduct : Product;
  cart : Cart;
  
  constructor() {
     this.products = [
       new Product(
         'MYSHOES', 'Black Running Shoes',
         '/resources/images/products/black-shoes.jpg',
         ['Men', 'Shoes', 'Running Shoes'],
         109.99),
      new Product(
         'NEATOJACKET', 'Blue Jacket',
         '/resources/images/products/blue-jacket.jpg',
         ['Women', 'Apparel', 'Jackets & Vests'],
         238.99),
       new Product(
         'NICEHAT', 'A Nice Black Hat',
         '/resources/images/products/black-hat.jpg',
         ['Men', 'Accessories', 'Hats'],
         29.99)
       ];
      this.cart = new Cart;
  }

    productWasSelected(product : Product):void{
        console.log('Product clicked: ', product);
        this.currentProduct = product;
    }

    productWasAdded(product : Product):void{
        console.log('Product added: ', product);
        console.log('Cart: ', this.cart);
        this.cart.addProduct(product);
    }

  /*articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }*/

}

bootstrap(InventoryApp);
