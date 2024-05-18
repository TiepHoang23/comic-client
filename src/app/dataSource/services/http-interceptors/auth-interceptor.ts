import { Injectable } from "@angular/core";
import { AccountService } from "../account.service";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AccountService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.

        const authToken = this.auth.getAuthorizationToken();

        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`),
            });
            return next.handle(authReq);
        }

        // send cloned request with header to the next handler.
        return next.handle(req);
    }
}