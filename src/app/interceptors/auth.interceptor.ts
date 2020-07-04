import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.dev';
import { AuthService } from '../shared/services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let transformedReq: HttpRequest<any> = req;

    const backendUrl  = new RegExp(environment.backendBaseUrl);

    if (backendUrl.test(req.url) && this.authService.getToken()) {
    transformedReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + this.authService.getToken() }});
    }

    return next.handle(transformedReq);
  }
}
