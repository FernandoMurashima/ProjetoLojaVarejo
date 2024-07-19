import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken(); // Pega o token do AuthService

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`) // Use 'Token' antes do token real
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
