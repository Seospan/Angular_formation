import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';

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
  }

  voteUp(): void {
    this.votes += 1;
  }

}
/*
@Component({
  selector: 'reddit-article',
  inputs: ['article'],
  host: {
    class: 'row'
  },
  template: `
    `
})
class ArticleComponent {
  article: Article;

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }
}
*/

@Component({
  selector: 'products-list',
  //inputs: ['article'],
  template: `
    `
})
class ProductsList {
  //article: Article;

 /* voteUp(): boolean {
    this.article.voteUp();
    return false;
  }*/
}


@Component({
  selector: 'inventory-app',
  directives: [ProductsList],
  template: `<div class="inventory-app">
            <products-list [productList]="products" (onProductSelected)="productWasSelected($event)">
            
            </products-list>
            <div *ngFor="let product of products">
                            <h1>{{ product.name }}</h1>
            <span>{{ product.sku }}</span>
            </div>

                (Products will go here soon)
        </div>
  `
})
class InventoryApp {

  products: Product[];
  
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
  }

    productWasSelected(product : Product):void{
        console.log('Product clicked: ', product)
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
