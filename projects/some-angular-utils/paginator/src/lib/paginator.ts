import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChevronDoubleLeftIconComponent } from './icons/chevron-double-left-icon';
import { ChevronDoubleRightIconComponent } from './icons/chevron-double-right-icon';
import { ChevronLeftIconComponent } from './icons/chevron-left-icon';
import { ChevronRightIconComponent } from './icons/chevron-right-icon';

@Component({
  selector: 'sau-paginator',
  templateUrl: './paginator.html',
  styleUrls: ['./paginator.scss'],
  imports: [
    ChevronDoubleLeftIconComponent,
    ChevronDoubleRightIconComponent,
    ChevronLeftIconComponent,
    ChevronRightIconComponent,
  ],
})
export class SAUPaginatorModule {

  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const total = Math.ceil(this.totalPages);
    if (total <= 0) return [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const start = Math.max(1, this.currentPage - 3);
    const end = Math.min(total, this.currentPage + 3);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages && newPage !== this.currentPage) {
      this.pageChange.emit(newPage);
    }
  }

  goToFirstPage() {
    this.changePage(1);
  }

  goToLastPage() {
    this.changePage(this.totalPages);
  }

}