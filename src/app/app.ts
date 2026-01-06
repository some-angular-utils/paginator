import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SAUPaginatorModule } from '@some-angular-utils/paginator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SAUPaginatorModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('paginator');
}
