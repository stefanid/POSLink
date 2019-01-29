import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErpService {
  private api = environment.apiUrl + 'erp';
  constructor(private http: HttpClient) { }

  getHeaders(System_Client_UID): Observable<any> {
    return this.http.get<any>(this.api + "/headers/" + System_Client_UID).pipe(
      catchError(this.handleError)
    );
  }

  getSyncData(Header_UID, System_Client_UID): Observable<any> {
    return this.http.get<any>(this.api + "/sync-data/" + Header_UID + "/" + System_Client_UID).pipe(
      catchError(this.handleError)
    );
  }

  getHeadersType(Header_UID): Observable<any> {
    return this.http.get<any>(this.api + "/header-types/" + Header_UID).pipe(
      catchError(this.handleError)
    );
  }

  getReportData(Header_UID, Type_UID, Client_UID): Observable<any> {
    return this.http.get<any>(this.api + "/report-data/" + Header_UID + "/" + Type_UID + "/" + Client_UID).pipe(
      catchError(this.handleError)
    );
  }

  addSyncData(erpData): Observable<any>{
    return this.http.post<any>(this.api + "/register", erpData).pipe(
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
