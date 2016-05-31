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
      public price: number,) {
  }

  voteUp(): void {
    this.votes += 1;
  }

}

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

@Component({
  selector: 'reddit',
  directives: [ArticleComponent],
  template: `
  `
})
class MyApp {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

}

bootstrap(RedditApp);
