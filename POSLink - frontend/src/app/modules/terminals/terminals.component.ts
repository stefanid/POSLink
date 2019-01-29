import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../shared/alert/alert.service';
import { Subscription } from 'rxjs';
import { ConfirmActionComponent } from '../../shared/confirm-action-alert/confirm-action.component';
import { TerminalsService } from './terminals.service';
import { ClientsService } from '../clients/clients.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileService } from './file-service.service';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html'
})
export class TerminalsComponent implements OnInit {
  clients: any;
  terminals = new Array();
  selectedTerminal: any = {};
  admin: Boolean = false;
  user: Boolean = false;
  terminalConnections: any;
  constructor(private translate: TranslateService,
    private alertService: AlertService,
    private terminalService: TerminalsService,
    private clientsService: ClientsService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private fileService: FileService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.getRoles();
    if (this.admin) {
      this.getTerminals();
    } else if (this.user) {
      this.getTerminalsClient();
    }
  }

  selectTerminal(terminal) {
    this.selectedTerminal = terminal;
  };


  getRoles() {
    var roles = this.authService.getUserRoles();
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].API_Role_Name == 'Terminal_Terminal_Create') {
        this.admin = true;
        this.user = false;
      }
      if (roles[i].API_Role_Name == 'Terminal_Terminal_Delete') {
        this.admin = true;
        this.user = false;
      } else {
        this.admin = false;
        this.user = true;
      }
    }

  }

  onSuccessAddOrUpdate(event) {
    this.getTerminals();
  };

  getTerminals() {
    this.terminals.length = 0;
    this.terminalService.getClients()
      .subscribe(clients => {
        if (clients !== undefined) {
          this.terminalService.getTerminals(clients).subscribe(terminal => {
            console.log('service', terminal);
            for (let i = 0; i < terminal.length; i++) {
              if (terminal[i]) {
                for (let x = 0; x < clients.response.length; x++) {
                  if (terminal[i].System_Client_UID == clients.response[x].System_Client_UID) {
                    terminal[i].System_Client_Name = clients.response[x].System_Client_Name;
                    this.terminals.push(terminal[i])
                  }

                }

              }
            }
            console.log(this.terminals);
            return this.terminals;
          }, error => {
            this.alertService.error(error);
          });

        }
      }, error => {
        this.alertService.error(error);
      });

  };

  getTerminalsClient() {
    this.terminals.length = 0;
    this.terminalService.getChildClientsOfParent()
      .subscribe(clients => {

        if (clients !== undefined) {
          this.terminalService.getTerminals(clients).subscribe(terminal => {
            for (let i = 0; i < terminal.length; i++) {
              if (terminal[i] !== null) {
                if (terminal !== undefined) {
                  for (let i = 0; i < terminal.length; i++) {
                    if (terminal[i]) {
                      for (let x = 0; x < clients.response.length; x++) {
                        if (terminal[i].System_Client_UID == clients.response[x].System_Client_UID) {
                          terminal[i].System_Client_Name = clients.response[x].System_Client_Name;
                          this.terminals.push(terminal[i])
                        }
                      }
                    }
                  }
                  for (let i = 0; i < this.terminals.length; i++) {
                    this.terminals[i].Terminal_CreateDate = new Date(this.terminals[i].Terminal_CreateDate).toLocaleString();
                    this.terminals[i].Terminal_LastUpdated = new Date(this.terminals[i].Terminal_LastUpdated).toLocaleString();
                  }

                  this.terminalService.getTerminalConnections(this.terminals).subscribe(connections => {
                    console.log('x', this.terminals)
                    for (let i = 0; i < connections.length; i++) {
                      if (connections[i]) {
                        if (connections[i].Terminal_Connection_LastSync == null) {
                          connections[i].Terminal_Connection_LastSync = '-'
                        } else {
                          connections[i].Terminal_Connection_LastSync = new Date(connections[i].Terminal_Connection_LastSync).toLocaleString();
                        }
                      }
                      for (let x = 0; x < this.terminals.length; x++) {
                        if (this.terminals[x].Terminal_UID == connections[i].Terminal_UID) {
                          this.terminals[x].Terminal_Connection_LastSync = connections[i].Terminal_Connection_LastSync;
                          this.terminals[x].Terminal_Connection_UID = connections[i].Terminal_Connection_UID;
                        }
                      }
                    }

                  }, error => {
                    this.alertService.error(error);
                  });
                }

              }

            }



            console.log('here', this.terminals);
            return this.terminals;
          }, error => {
            this.alertService.error(error);
          });
        }
      }, error => {
        this.alertService.error(error);
      });

  };

  downloadConfig(terminal) {
    let Terminal_UID = terminal.Terminal_UID;
    this.terminalService.downloadConfigFile(Terminal_UID).subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = terminal.System_Client_Name + '_' + terminal.Terminal_Name;
      document.body.appendChild(element);
      element.click();
    }, error => {
      this.alertService.error(error);
    });
  };

  deleteTerminal(terminal) {
    let Terminal_UID = terminal.Terminal_UID;
    let Terminal_Connection_UID = terminal.Terminal_Connection_UID;

    this.terminalService.deleteTerminal(Terminal_UID).subscribe(data => {
      this.terminalService.deleteTerminalConnection(Terminal_Connection_UID).subscribe(data => {
        this.getTerminals();
      }, error => {
        this.alertService.error(error);
      })
    }, error => {
      this.alertService.error(error);
    });
  }
}
