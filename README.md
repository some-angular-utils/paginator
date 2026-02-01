# @some-angular-utils/paginator

[![github stars](https://img.shields.io/github/stars/some-angular-utils/paginator.svg?style=social&label=Star)](https://github.com/some-angular-utils/paginator)

[![NPM Version](https://img.shields.io/npm/v/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)
[![NPM Downloads](https://img.shields.io/npm/dm/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)

[![npm bundle size](https://img.shields.io/bundlephobia/min/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)

---

[DEMO](https://some-angular-utils.github.io/paginator)

[NPM](https://www.npmjs.com/package/@some-angular-utils/paginator)

---

## IMPORT
```ts
import { SAUPaginatorModule } from '@some-angular-utils/paginator';
```

## HTML
```ts
<sau-paginator
    [totalPages]="totalPages"
    [currentPage]="currentPage"
    (pageChange)="onPageChange($event)"
></sau-paginator>
```

## COLORS

```css
.sau-paginator{
    --sau-color-primary: rgb(147, 51, 234);
    --sau-color-secondary: var(--sau-color-primary);
    --sau-color-background: rgb(255, 255, 255);
    --sau-color-edit: rgb(34, 197, 94);
    --sau-color-delete: rgb(239, 68, 68);
    --sau-color-text: rgb(31, 41, 55);
}
```