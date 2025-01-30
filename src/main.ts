/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Route } from '@angular/router';

// In the main application:
export const ROUTES: Route[] = [
  {path: 'employee', loadChildren: () => import('./app/routes').then(mod => mod.EMPLOYEE_ROUTES)},
  { path: '',   redirectTo: '/employee/list', pathMatch: 'full' }
  // ...
];

bootstrapApplication(AppComponent,
    {providers: [ provideAnimations(), provideRouter(ROUTES)]})
  .catch(err => console.error(err));

