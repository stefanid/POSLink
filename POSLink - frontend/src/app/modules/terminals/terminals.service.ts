import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../environments/environment';
import { ClientsService } from '../clients/clients.service';

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {
  terminals: any;
  clients = [];
  private terminal = environment.terminalURL + 'terminal';
  private terminalConnection = environment.terminalURL + 'terminal-connection';
  constructor(private http: HttpClient, private clientService: ClientsService) { }


  getClients(): Observable<any> {
    return this.clientService.getActiveClients();

  };
  getChildClientsOfParent(): Observable<any>{
    return this.clientService.getCurrentChildren();
  }

  getTerminals(clients): Observable<any> {
    console.log("x", clients.response);
    var path = '';
    for (let i = 0; i < clients.response.length; i++) {
      path += 'array=' + clients.response[i].System_Client_UID + "&";
    }
    return this.http.get<any>(this.terminal + "/clients/?" + path).pipe(
      retry(3),
      catchError(this.handleError)
    );
  };

  getTerminal(Terminal_UID): Observable<any> {
    return this.http.get<any>(this.terminal + "/single/" + Terminal_UID).pipe(
      retry(3),
      catchError(this.handleError)
    )
  };

  getTerminalConnections(Terminals): Observable<any> {
    console.log("Terminals", Terminals);
    var path = '';
    if(Terminals.length > 1){
      for (let i = 0; i < Terminals.length; i++) {
        path += 'terminals=' + Terminals[i].Terminal_UID + "&";
      }
    } else {
      path = 'terminals=' + Terminals[0].Terminal_UID;
    }
   
    console.log("dsds", this.terminalConnection + "/?" + path)
    return this.http.get<any>(this.terminalConnection + "/?" + path).pipe(
      retry(3),
      catchError(this.handleError)
    );
  };


  addTerminal(terminalDetails): Observable<any> {
    return this.http.post<any>(this.terminal + "/register", terminalDetails).pipe(
      catchError(this.handleError)
    );
  }

  addTerminalConnection(terminalDetails): Observable<any> {
    return this.http.get(this.terminalConnection + "/generate/?client=" + terminalDetails.Client_UID + "&terminal=" + terminalDetails.Terminal_UID, {
      responseType: 'arraybuffer'
    });
  }

  deleteTerminal(Terminal_UID): Observable<any> {
    return this.http.delete(this.terminal + "/" + Terminal_UID).pipe(
      retry(3),
      catchError(this.handleError)
    );
  };

  deleteTerminalConnection(Terminal_Connection_UID): Observable<any>{
    return this.http.delete(this.terminalConnection + "/" + Terminal_Connection_UID).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }



  downloadConfigFile(Terminal_UID) {
    return this.http.get(this.terminalConnection + "/download-config/" + Terminal_UID, {
      responseType: 'arraybuffer'
    });
  };






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
};
