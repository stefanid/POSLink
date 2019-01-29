import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Alert, AlertType } from './alert';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class AlertService {

    private subject = new Subject<Alert>();

    constructor(private router: Router) {
        router.events.subscribe(event=>{
            if(event instanceof NavigationStart){
                this.clear(); // clear alert messages on route change
            }
        })
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    error(message: string) {
        this.alert(AlertType.Error, message);
    }

    success(message: string) {
        this.alert(AlertType.Success, message);
    }
    info(message: string) {
        this.alert(AlertType.Info, message);
    }
    warn(message: string) {
        this.alert(AlertType.Warning, message);
    }
    alert(type: AlertType, message: string) {
        this.subject.next(<Alert>{ type: type, message: message });
    }
    clear() {
        // clear alerts
        this.subject.next();
    }
}
