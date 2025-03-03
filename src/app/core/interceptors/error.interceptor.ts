import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('❌ Error detectado:', error); // Verifica si el error es capturado
        let errorMessage = 'An unexpected error occurred';

        if (!navigator.onLine) {
          errorMessage = 'No internet connection. Please check your network.';
        } else if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Please try again later.';
        } else if (error.status >= 400 && error.status < 500) {
          errorMessage = `Client error: ${error.message}`;
        } else if (error.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }

        this.toastr.error(errorMessage, 'Error', {
          timeOut: 5000,
          positionClass: 'toast-bottom-right',
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
