import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-installation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './installation.html',
})
export class InstallationComponent {
  installSnippet = `npm install @some-angular-utils/paginator`;

  importSnippet = `import { SAUPaginatorModule } from '@some-angular-utils/paginator';

@Component({
  imports: [SAUPaginatorModule],
  // ...
})`;

  usageSnippet = `totalPages = 12;
currentPage = 1;

onPageChange(page: number) {
  this.currentPage = page;
  // re-fetch your data for the new page here
}`;

  templateSnippet = `<sau-paginator
  [totalPages]="totalPages"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)">
</sau-paginator>`;
}
