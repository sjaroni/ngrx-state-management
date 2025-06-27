import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './counter/states/counter.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { coursesReducer } from './courses/states/courses.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ counter: counterReducer, courses: coursesReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
