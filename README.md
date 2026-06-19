# @some-angular-utils/paginator

[![github stars](https://img.shields.io/github/stars/some-angular-utils/paginator.svg?style=social&label=Star)](https://github.com/some-angular-utils/paginator)

[![NPM Version](https://img.shields.io/npm/v/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)
[![NPM Downloads](https://img.shields.io/npm/dm/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)

[![npm bundle size](https://img.shields.io/bundlephobia/min/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@some-angular-utils/paginator)](https://www.npmjs.com/package/@some-angular-utils/paginator)

---

[NPM](https://www.npmjs.com/package/@some-angular-utils/paginator)

---

## DEMO

This repo ships with an interactive showcase app — every behavior has a live, editable example (edit the code, the paginator updates in real time). Run it locally:

```bash
npm install
npm run dev
```

Then open http://localhost:4200.

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
}
```