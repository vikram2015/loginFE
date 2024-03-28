import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse){
          if(event?.body){
            event.body.status = event.status;
          }
          event = event.clone({
            body: event.body
          });
        }
        return event;
      })
    )
  }
}

// export const responseInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
