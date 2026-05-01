import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/resume-page/resume-page.component').then(
        (m) => m.ResumePageComponent,
      ),
    title: 'Victor Moura | Full Stack Developer',
  },
];
