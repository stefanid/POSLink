import { Component, OnInit, Input} from '@angular/core';
import { Alert, AlertType } from "./alert";
import { AlertService } from "./alert.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];
  errorts: any;

  constructor(private alertService: AlertService, translate: TranslateService) {
    translate.get('e_testmessage').subscribe((res: string) => {
      this.errorts = res;
    });
  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
      }

      // add alert to array
      this.alerts.push(alert);
      setTimeout(() => this.removeAlert(alert), 2500);
    });
  }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert-success';
            case AlertType.Error:
                return 'alert-danger';
            case AlertType.Info:
                return 'alert-info';
            case AlertType.Warning:
                return 'alert-warning';
        }
    }

}
