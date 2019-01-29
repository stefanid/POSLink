import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RouterService } from './router.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { tokenKey } from '@angular/core/src/view';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private login_url = 'http://localhost:55770/login';
  private register_url = 'http://localhost:55770/register'
  private register_client_url = 'http://localhost:55770/register-client'
  private user_control_url = 'http://localhost:3485/user/roles'
  // private testUser = { 'User_Email': 'zsofia@zsofia.dk', 'User_Password': 'zso' };
  public isLoggedIn = new BehaviorSubject(false);
  public roles = new Array();
  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
  }

  userLogin(userLoginDetails) {
    this.roles.length = 0;
    const httpOptions =
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'site-token': '{"Site_Token_Value":"258M9RRUI7P2Q25KZP82"}',
            'api-token': 'DNJV3MF4QDMSFS3EUY1K'
          })
      };
    return this.http.post(this.login_url, userLoginDetails, httpOptions)
      .do(
        (data: any) => {
          this.setUser(userLoginDetails);
          
          this.setAccessToken(data);
          this.getRolesForUser().subscribe(roles => {
            for (let i = 0; i < roles.response.length; i++) {
             this.roles.push(roles.response[i]);             
            }

            var role = JSON.stringify(this.roles);
            this.setUserRoles(role)
          }, error => console.log(error));
        })
      .catch(this.handleError);
  };

  userRegister(userRegisterDetails) {
    const httpOptions =
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'site-token': '{"Site_Token_Value":"258M9RRUI7P2Q25KZP82"}'
          })
      };
    return this.http.post(this.register_url, userRegisterDetails, httpOptions)
      .do(
        (data: any) => {
          let token = data.token;
          return this.registerUserService(userRegisterDetails, token);
        })
      .catch(this.handleError);
  };

  registerUserService(userServiceDetails, token) {
    return this.userService.userRegister(userServiceDetails, token)
      .subscribe((data) => {
        if (data) {
          return data;
        }
      }),
      error => {
        return error;
      };
  };

  registerClient(clientDetails){
    const httpOptions =
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'site-token': '{"Site_Token_Value":"258M9RRUI7P2Q25KZP82"}',
            'api-token': 'DNJV3MF4QDMSFS3EUY1K'
          })
      };

      return this.http.post(this.register_client_url, clientDetails, httpOptions).pipe(
        catchError(this.handleError)
      );
  };

  confirmRegisterClient(token, clientDetails){
    const httpOptions =
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'site-token': '{"Site_Token_Value":"258M9RRUI7P2Q25KZP82"}',
          'api-token': 'DNJV3MF4QDMSFS3EUY1K',
          'X-Skip-Interceptor': '',
        })
    };

    return this.http.post(this.register_client_url + "/" + token, clientDetails, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRolesForUser(): Observable<any> {
    console.log("x");
    return this.http.get<any>(this.user_control_url).pipe(
      catchError(this.handleError)
    );
  };

  setUser(credentials) {
    window.sessionStorage.setItem('user', credentials);
  }
  setAccessToken(token) {
    window.sessionStorage.setItem('accessToken', token.token);
  }

  removeAccessToken() {
    window.sessionStorage.removeItem('accessToken');
  }

  getAccessToken() {
    const token = window.sessionStorage.getItem('accessToken');
    return token;
  }

  setUserRoles(roles) {
     window.sessionStorage.setItem('roles', roles);

  };

  getUserRoles() {
    const roles = window.sessionStorage.getItem('roles');
    return JSON.parse(roles);
  };

  removeRoles() {
    window.sessionStorage.removeItem('roles');
  };
  public isAuthenticated(): boolean {
    // get the token
    // return a boolean reflecting
    // whether or not the token is expired
    // return true;
    // return tokenNotExpired(token);

    let value = !!this.getAccessToken()
    this.isLoggedIn.next(value);
    console.log(value);
    return value;
  }


  public logOut() {
    this.removeAccessToken();
    this.isAuthenticated();
    this.router.navigate(['/login']);
  }
  public handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return Observable.throw('ErrorEvent' + error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 400) {
        return Observable.throw('Bad input');
      }
      if (error.status === 401) {
        return Observable.throw('Unauthorized, please login again');
      }


      if (error.status === 404) {
        console.error('An error occurred:', error.error.message);
        return Observable.throw('Not found');
      }
    }
    // return an ErrorObservable with a user-facing error message
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: `, error.error);
    return Observable.throw('Something bad happened; please try again later.');
  }

}
