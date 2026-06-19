import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './features.html',
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      title: 'Two inputs, done',
      description:
        'totalPages and currentPage in, a pageChange number out. No config object to learn, no extra wiring.',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2',
    },
    {
      title: 'Sliding page window',
      description:
        'Up to 7 numbered buttons at a time, centered on the current page — never floods the screen on large datasets.',
      icon: 'M4 6h16M4 12h16M4 18h7',
    },
    {
      title: 'First / last jump buttons',
      description:
        'Double-chevron buttons jump straight to page 1 or the last page, alongside the regular previous/next pair.',
      icon: 'M11 19l-7-7 7-7m8 14l-7-7 7-7',
    },
    {
      title: 'Edge states handled',
      description:
        'Previous/first disable themselves on page 1, next/last on the final page — no manual boundary checks needed.',
      icon: 'M6 18L18 6M6 6l12 12',
    },
    {
      title: 'Themeable via CSS variables',
      description:
        'Restyle colors with --sau-color-* custom properties on .sau-paginator — no rebuild, no theming API.',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5',
    },
    {
      title: 'Tiny footprint',
      description:
        'No dependencies beyond Angular itself — just buttons and a windowing function, nothing to bloat your bundle.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
  ];
}
