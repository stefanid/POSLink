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

@Injectable()
export class UserService {
  private register_url = 'http://localhost:3485/user/register'


  constructor(private http: HttpClient, private router: Router) { }

  userRegister(userRegisterDetails, token) {
    const httpOptions =
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Skip-Interceptor': '',
            'Client-Token': token
          }),
          skipInterceptor: true
      };

    let parseUserDetails = JSON.parse(userRegisterDetails);
    let userServiceObject = JSON.stringify({
      User_Email: parseUserDetails.User_Email,
      User_Name: parseUserDetails.User_Name,
      User_Phone: parseUserDetails.User_Phone
    });
    return this.http.post(this.register_url, userServiceObject, httpOptions)
      .do(
        (data: any) => {
          return data;
        })
      .catch((err: Response) => {
        let details = JSON.stringify(err);
        return Observable.throw(details);
      });
  };
}



