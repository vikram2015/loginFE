import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError } from 'rxjs';

@Injectable()
export class headerInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    const jwtToken = localStorage.getItem('access_token');
    const requestToHandle = jwtToken ? request.clone({
      headers: request.headers.set('Authorization', `Bearer ${jwtToken}`),
    })
    : request;
    return next.handle(requestToHandle).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401 && localStorage.length > 0){
          // this.authService.logout();
        }
        throw error;
      }),
    );
  }
}


// export const headerInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
