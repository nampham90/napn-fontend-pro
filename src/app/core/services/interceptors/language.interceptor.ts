import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable} from "@angular/core"
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { Observable } from "rxjs";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<NzSafeAny>, next: HttpHandler): Observable<HttpEvent<NzSafeAny>> {
        const lang = localStorage.getItem('lang') || "vi";

        req = req.clone({
            setHeaders: {
                'Accept-Language': lang
            }
        })

        return next.handle(req);
    }
}

