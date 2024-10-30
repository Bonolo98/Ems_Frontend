import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoaderInterceptor } from './services/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), AuthGuard,  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
};
