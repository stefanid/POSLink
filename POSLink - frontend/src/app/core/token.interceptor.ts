import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpClient, HttpResponse, HttpErrorResponse, } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
//add token to all the request calls globally

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private http: HttpClient) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has(InterceptorSkipHeader)) {
            const headers = request.headers.delete(InterceptorSkipHeader);
            return next.handle(request.clone({ headers }));
        } else {
            request = request.clone(
                {
                    setHeaders:
                        {
                            "Client-Token": `${this.authService.getAccessToken()}`
                        }
                });
        }

        return next.handle(request).do((event: HttpEvent<any>) => { },
            (err: any) => {
                console.log('ss' , err.error)
                if (err instanceof HttpErrorResponse && err.status == 401 && err.error == 'Token has expired.' ) {
                    
                    const httpOptions =
                        {
                            headers: new HttpHeaders(
                                {
                                    'Content-Type': 'application/json',
                                    'site-token': '{"Site_Token_Value":"258M9RRUI7P2Q25KZP82"}',
                                    "api-token": "DNJV3MF4QDMSFS3EUY1K"
                                })
                        };
                    this.http.post("http://localhost:55770/login", window.sessionStorage.getItem("user"), httpOptions)

                        .subscribe((data: any) => {
                           
                            if (data.token) {
                                this.authService.removeAccessToken();
                                this.authService.setAccessToken(data);
                                request = request.clone(
                                    {
                                        setHeaders:
                                            {
                                                "Client-Token": `${this.authService.getAccessToken()}`
                                            }
                                    });
                                next.handle(request);

                            }


                        })


                }
            }); // passing control to the next interceptor in the chain, if there is one
    }
}
