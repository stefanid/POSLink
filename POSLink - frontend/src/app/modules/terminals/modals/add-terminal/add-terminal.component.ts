import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { AlertService } from '../../../../shared/alert/alert.service';
import { TerminalsService } from '../../terminals.service';


@Component({
  selector: 'app-add-terminal-modal',
  templateUrl: './add-terminal.component.html'
})
export class AddTerminalModalComponent implements OnInit {

  @Output() success = new EventEmitter<boolean>();
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;

  clients: any;
  addTerminalForm: FormGroup;
  successAddMsg: string;



  constructor(
    private formBuilder: FormBuilder,
    private terminalService: TerminalsService,
    private alertService: AlertService,
    private translate: TranslateService) { 

      this.createForm();
      translate.get('clientPage.t_success_new_terminal_added').subscribe((res: string) => {
        this.successAddMsg = res;
      });
    }

  ngOnInit() {
   this.getClients();
  }

  getClients() {
    this.terminalService.getClients()
    .subscribe(data => {
     this.clients = data.response;

    }, error => {
      this.closeModal();
      this.alertService.error(error);
    });
  }
  addNewTerminal() {
    var terminalDetails = this.addTerminalForm.value;
    this.terminalService.addTerminal(terminalDetails).subscribe(terminal => {
      let Terminal_UID = terminal[0].Terminal_UID;
      let Client_UID = terminal[0].System_Client_UID;
      for (let i = 0; i < this.clients.length; i++) {
       if(Client_UID == this.clients[i].System_Client_UID){
        terminal[0].System_Client_Name = this.clients[i].System_Client_Name;
       }
        
      }
      terminalDetails = {};
      terminalDetails.Terminal_UID = Terminal_UID;
      terminalDetails.Client_UID = Client_UID;
      this.terminalService.addTerminalConnection(terminalDetails).subscribe(terminalConnection => {
        const blob = new Blob([terminalConnection], {
          type: 'application/zip'
        });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = terminal[0].System_Client_Name + '_' + terminal[0].Terminal_Name;
        document.body.appendChild(element);
        element.click();
        this.closeModal();
        this.alertService.success(this.successAddMsg);
        this.success.emit(true);
       }, error => {
        this.closeModal();
        this.alertService.error(error);
       })
    }, error => {
      this.closeModal();
      this.alertService.error(error);
    });
  };

  closeModal() {
    this.closeModalBtn.nativeElement.click();
  };


  createForm(): void {
    this.addTerminalForm = this.formBuilder.group({
      Terminal_Name: ['', Validators.required],
      Client_UID: [null, Validators.required],
      Terminal_TypeID: [null, Validators.required]
    });
  }
}
