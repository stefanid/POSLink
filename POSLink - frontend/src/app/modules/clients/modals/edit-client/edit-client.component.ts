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
import { ClientsService } from '../../clients.service';

@Component({
  selector: 'app-edit-client-modal',
  templateUrl: './edit-client.component.html'
})
export class EditClientModalComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  @Output() success = new EventEmitter<boolean>();
  @Input() selectedClient: any;
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;
  editClientForm: FormGroup;
  public successUpdateMsg: string;
  countries: any;
  children: any;
  constructor(private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.createForm();
    translate.get('t_success_client_updated').subscribe((res: string) => {
      this.successUpdateMsg = res;
    });
  }

  ngOnInit() {
    this.getCountries();
   
  }

  getCountries() {
    this.clientService.getCountries().subscribe(data => {
      this.countries = data;
    }, error => {
      console.log(error);
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    this.getAvailableChildrenLocations();
    if (this.selectedClient.System_Client_UID) {
      var checkValue = JSON.parse(JSON.stringify(this.selectedClient, function (key, value) { return (value === '-') ? null : value }));

      this.editClientForm.setValue(
        {
          Client_Name: checkValue.System_Client_Name,
          Client_Adr1: checkValue.System_Client_Adr1,
          Client_Adr2: checkValue.System_Client_Adr2,
          Client_Adr3: checkValue.System_Client_Adr3,
          Client_PostalCode: checkValue.System_Client_PostalCode,
          Country_UID: checkValue.Utility_Country_UID,
          Client_City: checkValue.System_Client_City,
          Client_VAT: checkValue.System_Client_VAT,
          Client_EAN: checkValue.System_Client_EAN,
          Client_InvoiceEmail: checkValue.System_Client_InvoiceEmail,
          Client_PUID: checkValue.System_Client_PUID
        });

    }

  }
  getAvailableChildrenLocations() {
    
    var checkValue = JSON.parse(JSON.stringify(this.selectedClient, function (key, value) { return (value === '-') ? null : value }));
    this.clientService.getChildrenEdit(checkValue.System_Client_UID).subscribe(data => {
      this.children = data.response;
    }, error => {
      console.log(error);
    });
  }

  editClients() {
    var updateData = this.editClientForm.value;
    let Client_UID = this.selectedClient.System_Client_UID;
    this.clientService.updateClients(Client_UID, updateData)
      .subscribe(data => {
        this.closeModal();
        this.alertService.success('Success');
        this.success.emit(true);
      }, error => {
        this.closeModal();
        this.alertService.error(error);
      });
  }

  createForm(): void {
    this.editClientForm = this.formBuilder.group({
      Client_Name: ['', Validators.required],
      Client_Adr1: [null],
      Client_Adr2: [null],
      Client_Adr3: [null],
      Client_PostalCode: [null],
      Client_City: ['', Validators.required],
      Country_UID: ['', Validators.required],
      Client_VAT: [null],
      Client_EAN: [null],
      Client_InvoiceEmail: [null, Validators.required],
      Client_PUID: [null, Validators.required],
    }, { validator: this.validateEmail.bind(this) });
  }


  closeModal() {
    this.closeModalBtn.nativeElement.click();
  }

  private validateEmail(form: FormGroup){
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(form.controls['Client_InvoiceEmail'].value && !EMAIL_REGEXP.test(form.controls['Client_InvoiceEmail'].value)){
      return { emailValidate: true };
    }
    return null;
  };

}
