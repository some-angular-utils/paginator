import { Component, signal } from '@angular/core';
import { SAUPaginatorModule } from '@some-angular-utils/paginator';

@Component({
  selector: 'app-root',
  imports: [SAUPaginatorModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('paginator');

  total = Array.from({ length: 20 }, (_, i) => i + 1);
  page = 1;

  getitems() {
    console.log(`Página actual: ${this.page}`);
  }
}
