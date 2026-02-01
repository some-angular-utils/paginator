import { Component, ViewEncapsulation } from '@angular/core';
import { SAUPaginatorModule } from '@some-angular-utils/paginator';

@Component({
  selector: 'app-root',
  imports: [SAUPaginatorModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None
})
export class App {
  totalPages: number = 0;
  currentPage: number = 0;

  ngOnInit() {
    this.totalPages = 101
    this.currentPage = 1
  }

  onPageChange(nuevaPagina: number) {
    this.currentPage = nuevaPagina;
  }
}
