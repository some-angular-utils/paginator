import { Component, signal } from '@angular/core';
import { SAUPaginatorModule } from '@some-angular-utils/paginator';

@Component({
  selector: 'app-root',
  imports: [SAUPaginatorModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  totalPages: number = 101;
  currentPage: number = 1;

  onPageChange(nuevaPagina: number) {
    this.currentPage = nuevaPagina;
  }
}
