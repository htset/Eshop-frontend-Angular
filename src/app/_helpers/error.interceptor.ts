import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services/authentication.service';
import { Router } from '@angular/router';
import { LoadingDialogService } from '@app/_services/loading-dialog.service';
import { ErrorDialogService } from '@app/_services/error-dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private loadingDialogService: LoadingDialogService,
                private errorDialogService: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//        this.loadingDialogService.openDialog();
        return next.handle(request).pipe(
            catchError(error => {
                console.error("Error from error interceptor", error);

                if (error.status !== 404){
                    this.errorDialogService.openDialog(error.message ?? JSON.stringify(error), error.status);
                }

                if (error.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    this.router.navigate(['login']);
                // location.reload(true);
                }
                else if (error.status === 404) {
                    this.router.navigate(['404']);
                }

                const error1 = error.message || error.statusText;
                return throwError(error1);
            }),
            finalize(() => {
//                this.loadingDialogService.hideDialog();
            })
        ) as Observable<HttpEvent<any>>;
    }
}