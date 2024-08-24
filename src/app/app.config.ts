import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { DatePipe, registerLocaleData } from '@angular/common';
import localsEs from '@angular/common/locales/es';
import localeEsAR from '@angular/common/locales/es-AR';
import localeEsARExtra from '@angular/common/locales/extra/es-AR';
registerLocaleData(localsEs, 'es');
registerLocaleData(localeEsAR, 'es-AR', localeEsARExtra);
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: LOCALE_ID, useValue: 'es' },
    DatePipe
  ],
};
