import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { AccountService } from "@services/account.service";
import { catchError, map, tap, throwError } from "rxjs";
import { HttpService } from "@services/http.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AccountService, private httpService: HttpService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();

        let _req = req;
        if (req.method === 'GET') {
            this.httpService.TaskAdd(req.url);
        }

        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`),
            });
            _req = authReq;
        }

        // send cloned request with header to the next handler.
        return next
            .handle(_req)
            .pipe(
                catchError(err => {
                    if (req.method === 'GET') {
                        this.httpService.TaskRemove(req.url);
                    }
                    return throwError(() => err);
                }),

                map(event => {
                    if (event instanceof HttpResponse) {
                        if (req.method === 'GET') {
                            this.httpService.TaskRemove(req.url);
                        }
                    }
                    return event;
                })
            )

    }
}