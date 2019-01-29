import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../environments/environment';
import { TerminalsService } from '../terminals/terminals.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private file = environment.fileUrl + 'file';
  constructor(private http: HttpClient) { }


  getTopFiles(Client_UID): Observable<any>{
    return this.http.get(this.file + "/top/" + Client_UID).pipe(
      retry(3),
      catchError(this.handleError)
    )
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
