import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../shared/alert/alert.service';
import { Subscription } from 'rxjs';
import { ConfirmActionComponent } from '../../shared/confirm-action-alert/confirm-action.component';
import { ClientsService } from './clients.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'

})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: any;
  selectedClient: any = {};
  admin: Boolean = false;
  constructor(private translate: TranslateService,
    private alertService: AlertService,
    private authService: AuthService,
    private clientsService: ClientsService,
    private renderer: Renderer2,
    private elementRef: ElementRef) { }


  ngOnInit() {
    console.log(this.getRoles());
    if(this.admin){
      console.log("im admin")
      this.getClientsForAdmin();
    }if(!this.admin) {
      console.log("im user")
      this.getClientsForClient();
    }
  }

  getRoles() {
    var roles = this.authService.getUserRoles();
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].API_Role_Name == 'Client_Client_Create') {
        this.admin = true;
        if (roles[i].API_Role_Name == 'Client_Client_Edit') {
          this.admin = true;
          if (roles[i].API_Role_Name == 'Client_Client_Delete') {
            this.admin = true;
          }
        }
      }

    }
    return this.admin;
  }



  getClientsForAdmin() {
    this.clientsService.getClients()
      .subscribe(data => {
        console.log(data);
        this.clients = data.response;
      }), error => this.alertService.error(error);
  }

  getClientsForClient() {
    this.clientsService.getCurrentChildren().subscribe(data => {
      this.clients = data.response;
    }), error => this.alertService.error(error);
  }

  selectClient(client) {
    this.selectedClient = client;
  }

  disableClient(client) {
    if (client.System_Client_Status == 'Disabled') {

      this.clientsService.activateClient(client.System_Client_UID)
        .subscribe(data => {
          this.alertService.success(data.response);
          this.getClientsForAdmin();
        }, error => {
          this.alertService.error(error);
        });
    } else {
      this.clientsService.disableClient(client.System_Client_UID)
        .subscribe(data => {
          this.alertService.success(data.response);
          this.getClientsForAdmin();
        }, error => {
          this.alertService.error(error);
        });
    }

  }


  onSuccessAddOrUpdate(event) {
    this.getClientsForAdmin();
  }




  ngOnDestroy() {
  }

}
