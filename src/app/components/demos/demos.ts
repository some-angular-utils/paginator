import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, Renderer2, signal, WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SAUPaginatorModule } from '@some-angular-utils/paginator';
import { CodeEditorComponent } from '../code-editor/code-editor';

type DemoId = 'basic' | 'large' | 'theme';
type DemoKind = 'js' | 'css';

interface DemoEntry {
  id: DemoId;
  label: string;
  description: string;
  kind: DemoKind;
  initialCode: string;
  code: WritableSignal<string>;
  parsed: WritableSignal<any>;
  error: WritableSignal<string | null>;
  livePage: WritableSignal<number>;
}

function evalConfig(text: string): any {
  return new Function(`"use strict"; return (\n${text}\n);`)();
}

// sau-paginator uses emulated encapsulation, so its own `.sau-paginator[_ngcontent-x]` rule has
// the same specificity as our override and can win on source order alone — !important forces ours to win.
function withImportant(declarations: string): string {
  return declarations.replace(/;\s*$/gm, ' !important;');
}

function createDemo(id: DemoId, label: string, description: string, kind: DemoKind, initialCode: string): DemoEntry {
  const initialParsed = kind === 'css' ? { css: initialCode } : evalConfig(initialCode);
  return {
    id,
    label,
    description,
    kind,
    initialCode,
    code: signal(initialCode),
    parsed: signal<any>(initialParsed),
    error: signal<string | null>(null),
    livePage: signal<number>(initialParsed?.currentPage ?? 1),
  };
}

const BASIC_CODE = `{
  totalPages: 5,
  currentPage: 1,
}`;

const LARGE_CODE = `{
  totalPages: 50,
  currentPage: 23,
}`;

const THEME_CODE = `--sau-color-primary: rgb(35, 163, 31);
--sau-color-secondary: rgb(35, 163, 31);
--sau-color-background: rgb(255, 255, 255);`;

@Component({
  selector: 'app-demos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SAUPaginatorModule, CodeEditorComponent],
  templateUrl: './demos.html',
})
export class DemosComponent implements OnDestroy {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private themeStyleEl = this.renderer.createElement('style') as HTMLStyleElement;

  activeTab = signal<DemoId>('basic');

  demos: DemoEntry[] = [
    createDemo('basic', 'Basic', 'A handful of pages — every number fits, no window needed. Edit totalPages or currentPage below.', 'js', BASIC_CODE),
    createDemo('large', 'Large page counts', 'With 50 pages, only 7 numbered buttons show at a time, centered on the current page, plus first/last jump buttons.', 'js', LARGE_CODE),
    createDemo('theme', 'Theming', 'Every color is a CSS custom property. Edit the values below and watch it restyle instantly.', 'css', THEME_CODE),
  ];

  constructor() {
    this.renderer.appendChild(this.document.head, this.themeStyleEl);

    for (const demo of this.demos) {
      let timer: ReturnType<typeof setTimeout> | undefined;

      effect(() => {
        const text = demo.code();

        if (demo.kind === 'css') {
          demo.parsed.set({ css: text });
          demo.error.set(null);
          this.renderer.setProperty(this.themeStyleEl, 'textContent', `.theme-live .sau-paginator { ${withImportant(text)} }`);
          return;
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
          try {
            const value = evalConfig(text);
            demo.parsed.set(value);
            demo.livePage.set(value.currentPage ?? 1);
            demo.error.set(null);
          } catch (err) {
            demo.error.set(err instanceof Error ? err.message : 'Invalid code');
          }
        }, 600);
      });
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(this.document.head, this.themeStyleEl);
  }

  selectTab(id: DemoId) {
    this.activeTab.set(id);
  }

  themeTotalPages = 10;
  themeCurrentPage = signal(4);
}
