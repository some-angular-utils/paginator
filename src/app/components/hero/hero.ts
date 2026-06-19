import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SAUPaginatorModule } from '@some-angular-utils/paginator';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAUPaginatorModule],
  templateUrl: './hero.html',
})
export class HeroComponent {
  copied = signal(false);
  currentPage = signal(1);
  totalPages = 4;

  copyInstall() {
    navigator.clipboard?.writeText('npm install @some-angular-utils/paginator');
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
