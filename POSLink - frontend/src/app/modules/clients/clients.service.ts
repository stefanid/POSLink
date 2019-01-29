import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private api = environment.apiUrl + 'client';
  private country = "http://localhost:3456/"
  private connection = environment.apiUrl + 'integrationConnection';
 
  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<any>(this.api+ "/all").pipe(
      catchError(this.handleError)
    );
  };

  getActiveClients(): Observable<any> {
    return this.http.get<any>(this.api + "/all/?status=10").pipe(
      catchError(this.handleError)
    );
  }

  addClients(clientDetails): Observable<any> {
    return this.http.post<any>(this.api + "/register", clientDetails).pipe(
      catchError(this.handleError)
    );
  };

  updateClients(Client_UID, clientDetails): Observable<any> {
    return this.http.put<any>(this.api + "/update/" + Client_UID, clientDetails).pipe(
      catchError(this.handleError)
    );
  }

  addClientUser(Client_UID): Observable<any> {
    console.log(Client_UID);
    return this.http.get<any>(this.api + "/authenticate-client/" + Client_UID).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addIntegrationConnection(connectionDetails):Observable<any>{
    return this.http.post<any>(this.connection + "/register", connectionDetails).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  disableClient(Client_UID): Observable<any> {
    return this.http.delete<any>(this.api + "/" + Client_UID).pipe(
      catchError(this.handleError)
    );
  }

  activateClient(Client_UID): Observable<any> {
    return this.http.get<any>(this.api + "/activate/" + Client_UID).pipe(
      catchError(this.handleError)
    );
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.country + "country").pipe(
      catchError(this.handleError)
    );
  }

  getChildren() : Observable<any>{
    return this.http.get<any>(this.api + "/available-children").pipe(
      catchError(this.handleError)
    );
  }

  getChildrenEdit(Client_UID) : Observable<any>{
    return this.http.get<any>(this.api + "/available-children/?client=" + Client_UID).pipe(
      catchError(this.handleError)
    );
  }

  

  getCurrentChildren(): Observable<any>{
    return this.http.get<any>(this.api + "/current/child").pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return Observable.throw('ErrorEvent' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 400)
        return Observable.throw('Bad input');

      if (error.status === 401)
        return Observable.throw('Unauthorized, please login again');

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
