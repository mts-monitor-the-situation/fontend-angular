import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^https?:\/\//i.test(req.url)) {
      req = req.clone({ url: `${environment.apiBaseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}` });
    }
    return next.handle(req);
  }
}
