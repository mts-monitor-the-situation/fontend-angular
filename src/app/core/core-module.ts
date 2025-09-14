import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpBaseUrlInterceptor } from './interceptors/http-base-url/http-base-url-interceptor'; 
import { HttpErrorInterceptor } from './interceptors/http-error/http-error-interceptor'; 
import { environment } from '../../environments/environment';

// Your existing HTTP-based ApiService
import { ApiService as ApiHttpService } from './services/api/api';
// The mock one we just created
import { ApiMockService } from './services/api/api.mock';

// Re-export a single class name everywhere: ApiService
export class ApiService extends ApiHttpService {}

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpBaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor,  multi: true },

    // ⬇️ choose mock or real at runtime
    { provide: ApiService, useClass: environment.mock ? ApiMockService : ApiHttpService }
  ]
})
export class CoreModule {}
