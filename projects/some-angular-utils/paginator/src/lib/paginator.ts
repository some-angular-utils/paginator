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

  @Input() total: number[] = []
  @Input() page: number = 1
  @Output() getItems = new EventEmitter();


  // Getter para obtener las páginas visibles (3 antes y 3 después de la página actual)
  get visiblePages(): number[] {
    const totalPages = this.total.length;
    if (totalPages <= 7) {
      // Si hay 7 páginas o menos, mostrar todas
      return this.total;
    }

    const currentPage = this.page;
    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, currentPage + 3);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  changePage(page: number) {
    this.page = page
    this.getItems.emit();
  }

  // Método para ir a la primera página
  goToFirstPage() {
    if (this.page !== 1) {
      this.changePage(1);
    }
  }

  // Método para ir a la última página
  goToLastPage() {
    const lastPage = this.total.length;
    if (this.page !== lastPage && lastPage > 0) {
      this.changePage(lastPage);
    }
  }

}
