import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ui-library-page/ui-library-page.component').then(
        (m) => m.UiLibraryPageComponent,
      ),
    title: 'Retro UI | Showcase',
  },
];
