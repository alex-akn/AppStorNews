/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS, JsonpInterceptor } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';
import { EnsureHttpsInterceptor } from './ensure-https-interceptor';

//import { AuthInterceptor } from './auth-interceptor';
//import { CachingInterceptor } from './caching-interceptor'

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true }
  //{ provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
];