# CLAUDE.md

Contexto para trabajar en este repo. Es un workspace de Angular con dos proyectos:

- **`paginator`** (`src/app`) — la landing page/showcase de la librería. No es un producto real, no tiene backend.
- **`@some-angular-utils/paginator`** (`projects/some-angular-utils/paginator`) — la librería Angular publicable de verdad (el componente `<sau-paginator>`).

Este repo es hermano de `c:\Users\ADMINISTRATOR\Desktop\table` y `c:\Users\ADMINISTRATOR\Desktop\selector` (`@some-angular-utils/table` y `@some-angular-utils/filter`) — las tres landing pages siguen exactamente el mismo patrón (mismo navbar/hero/features/demos/installation/footer, mismo mini editor de código). Si cambias algo estructural aquí, probablemente también aplique en esos otros dos repos, y viceversa.

## Árbol del código

```
paginator/
├── CLAUDE.md
├── README.md
├── angular.json
├── package.json
├── .postcssrc.json                      # Tailwind v4 vía @tailwindcss/postcss
├── tsconfig.json                        # mapea "@some-angular-utils/paginator" -> dist/some-angular-utils/paginator
│
├── src/                                  # app showcase (proyecto "paginator")
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss                       # Tailwind v4 (@import "tailwindcss" + @theme, sin tailwind.config.js)
│   └── app/
│       ├── app.ts / app.html / app.scss / app.config.ts / app.routes.ts
│       └── components/
│           ├── navbar/         navbar.ts                  — barra superior fija
│           ├── hero/            hero.ts, hero.html          — portada con un sau-paginator clicable de verdad
│           ├── features/        features.ts, features.html  — grid de características
│           ├── demos/           demos.ts, demos.html         — "See it in action": las 3 demos editables en vivo
│           ├── code-editor/     code-editor.ts/html/scss     — mini editor de código reutilizable (usado por demos)
│           ├── installation/    installation.ts, installation.html — instrucciones de instalación/uso
│           └── footer/          footer.ts                    — pie de página
│
└── projects/some-angular-utils/paginator/   # la librería publicable
    └── src/
        ├── public-api.ts                  # exports públicos del paquete npm
        └── lib/
            ├── paginator.ts / paginator.html / paginator.scss   # componente principal <sau-paginator>
            └── icons/                                            # los 4 iconos de flecha (chevron) como componentes standalone
```

## El orden de build importa

La app importa la librería como `@some-angular-utils/paginator`, que `tsconfig.json` mapea a `./dist/some-angular-utils/paginator` — **no** al código fuente. Si editas algo dentro de `projects/some-angular-utils/paginator/src`, hay que reconstruir antes de que la app lo vea:

```bash
npm run build:lib   # ng-packagr -> dist/some-angular-utils/paginator
```

`ng serve` (usa Vite) pre-empaqueta dependencias y **no** recoge de forma confiable un `dist/` recién construido. Después de `build:lib`, mata y reinicia `ng serve` (o borra `.angular/cache` antes) — no asumas que el hot-reload lo detectó.

## Storybook fue eliminado

Storybook (`.storybook/` en la raíz y en la librería, `src/stories/`, los targets `storybook`/`build-storybook` en `angular.json`, las dependencias `@storybook/*`, el workflow `publishStorybook.yml` y `debug-storybook.log`) se eliminó a propósito en favor de la app showcase de `src/app`. No lo reintroduzcas a menos que se pida explícitamente.

Nota: al quitar las dependencias de Storybook, un `npm install` normal falló por un conflicto de peer dependencies que dejó `@storybook/angular` en un estado intermedio en `node_modules`/`package-lock.json`. Se resolvió borrando `node_modules` y `package-lock.json` y reinstalando desde cero — si vuelve a pasar algo parecido tras tocar dependencias, esa es la salida más simple, no `--legacy-peer-deps` por reflejo.

## Gotcha de especificidad CSS al teñir en vivo (igual que en `selector`, no como en `table`)

La demo de "Theming" inyecta un `<style>` global de forma imperativa vía `Renderer2` + `DOCUMENT` (Angular extrae las etiquetas `<style>` literales de las plantillas en tiempo de compilación y nunca llegan al DOM en tiempo de ejecución, así que no hay otra forma de hacerlo reactivo).

`sau-paginator`, igual que `sau-filter`, usa encapsulación Emulated por defecto (a diferencia de `sau-table`, que usa `ViewEncapsulation.None`). Eso significa que la propia regla `.sau-paginator { ... }` de la librería se compila como `.sau-paginator[_ngcontent-xxx] { ... }` — misma especificidad que nuestro override `.theme-live .sau-paginator`. Con especificidad empatada, el orden de inserción en el `<head>` decide, y no es fiable. La solución es añadir `!important` a cada declaración generada (función `withImportant()` en `demos.ts`) — el mismo patrón que en `selector/src/app/components/demos/demos.ts`, copiado tal cual porque el problema es idéntico.

## Cómo funciona el editor de las demos en vivo (`src/app/components/demos`)

Mismo patrón general que en `table`/`selector`: cada pestaña tiene su propio mini editor de código (`src/app/components/code-editor`) enlazado a un string `{ totalPages, currentPage }`. Al editar (debounce ~600ms), el texto se evalúa con `new Function('"use strict"; return (' + texto + ');')()` — evaluado en el propio navegador del visitante, sin ida y vuelta al servidor.

A diferencia de `sau-table`/`sau-filter`, **`paginator.ts` no tiene ningún lifecycle hook** — `visiblePages` es un getter que se recalcula en cada ciclo de detección de cambios directamente desde `this.totalPages`/`this.currentPage`. Por eso aquí **no** se necesita el truco `@for (cfg of [demo.parsed()]; track cfg)` para forzar la recreación del componente: basta con enlazar `[totalPages]`/`[currentPage]` directamente y todo se actualiza solo. Si se porta este patrón a una librería nueva, comprobar primero si el componente lee sus inputs en un hook de un solo uso (`ngOnInit`/`ngAfterViewInit`) antes de asumir que se necesita el truco del `track`.

Cada demo mantiene además una señal `livePage` separada del código editable: al editar el código se reinicia a `currentPage` del config, pero los clics en los botones de paginación la van actualizando sin tocar el editor — así la demo es realmente clicable, no solo una vista estática de la config.

## El README tenía variables CSS muertas documentadas

El README original listaba `--sau-color-edit`, `--sau-color-delete` y `--sau-color-text` en la sección COLORS, copiadas de otra librería hermana (`table`). En `paginator.scss` esas variables se declaran pero **ninguna regla las usa** (`grep` lo confirma) — solo `--sau-color-primary`, `--sau-color-secondary` y `--sau-color-background` tienen efecto visual real. Se quitaron del README y la demo de Theming solo expone esas tres. Si se reescribe el README, verificar contra `paginator.scss` con grep antes de copiar la lista de variables de otro paquete.

## Convenciones de este repo (`.github/copilot-instructions.md`)

Idéntico al de `table`/`selector`. Se respetó al escribir los componentes nuevos de `src/app`: `ChangeDetectionStrategy.OnPush` en todos los componentes, `input()`/`output()`/`model()` en vez de decoradores donde tiene sentido, `@if`/`@for`/`@switch` nativos, sin `ngClass`/`ngStyle`, sin arrow functions dentro de plantillas. La librería (`projects/some-angular-utils/paginator`) es código preexistente y NO sigue estas convenciones (usa `@Input`/`@Output`) — no es necesario migrarla solo por consistencia.

## Tailwind v4

No hay `tailwind.config.js` — v4 se configura con `@import "tailwindcss";` + un bloque `@theme { ... }` directamente en `src/styles.scss`, procesado por `@tailwindcss/postcss` (ver `.postcssrc.json`). La escala de color de marca (`brand-50`...`brand-900`) vive ahí.

## Gotcha de rutas en Windows + git-bash (solo importa al scriptear/probar con la herramienta Bash)

El `/tmp` de git-bash está mapeado a `AppData/Local/Temp`, pero un proceso `node.exe` nativo resuelve un string literal `'/tmp/...'` pasado como argumento JS relativo a la raíz de la unidad actual (`C:\tmp\...`) en su lugar — **no** son el mismo directorio. Si un script de Node escribe archivos en `/tmp/...` y la herramienta Bash no los encuentra después, revisar primero `C:\tmp\...` antes de asumir que la escritura falló.

También: la cwd de la herramienta Bash en esta sesión tiende a resetearse a otro directorio del workspace entre llamadas — antepón siempre `cd "C:/Users/ADMINISTRATOR/Desktop/paginator" &&` a cada comando, no asumas que el `cd` anterior persiste.
