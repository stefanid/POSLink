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
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client.component.html'
})
export class AddClientModalComponent implements OnInit {
  @Output() success = new EventEmitter<boolean>();
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;

  addClientsForm: FormGroup;
  successAddMsg: string;
  countries: any;
  children: any;
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private alertService: AlertService,
    private translate: TranslateService,
    private authService: AuthService

  ) {
    this.createForm();
    translate.get('clientPage.t_success_new_client_added').subscribe((res: string) => {
      this.successAddMsg = res;
    });

  }


  ngOnInit() {
    this.getCountries();
    this.getAvailableChildrenLocations();
  }

  getCountries() {
    this.clientService.getCountries().subscribe(data => {
      this.countries = data;
      console.log(this.countries, "count");
    }, error => {
      console.log(error);
    });
  };

  getAvailableChildrenLocations() {
    this.clientService.getChildren().subscribe(data => {
      this.children = data.response;
      console.log(data.response);
    }, error => {
      console.log(error);
    });
  }

  addNewClient() {
    var formValues = this.addClientsForm.value;
    var checkValue = JSON.parse(JSON.stringify(formValues, function (key, value) { return (value === '') ? null : value }));
    console.log(formValues);
    let registerClient = {
      Client_Name: checkValue.Client_Name,
      Client_PUID: checkValue.Client_PUID,
      Client_Adr1: checkValue.Client_Adr1,
      Client_Adr2: checkValue.Client_Adr2,
      Client_Adr3: checkValue.Client_Adr3,
      Client_PostalCode: checkValue.Client_PostalCode,
      Client_City: checkValue.Client_City,
      Client_VAT: checkValue.Client_VAT,
      Client_EAN: checkValue.Client_EAN,
      Client_InvoiceEmail: checkValue.Client_InvoiceEmail,
      Country_UID: checkValue.Country_UID
    };

    this.clientService.addClients(registerClient)
      .subscribe(client => {
        let Client_UID = client.response[0].System_Client_UID;
        this.clientService.addClientUser(Client_UID).subscribe(clientUser => {


          let connectionDetails = {
            Client_UID: Client_UID,
            Integration_Connection_TypeID: formValues.Integration_Connection_TypeID,
            Integration_Connection_SSTR5: formValues.Integration_Connection_SSTR5,
            Integration_Connection_MSTR5: formValues.Integration_Connection_MSTR5
          };
          console.log("connectionDetails" , connectionDetails);
           this.clientService.addIntegrationConnection(connectionDetails).subscribe(connection => {
            let clientDetails = {
              User_Email: formValues.Client_InvoiceEmail,
              User_Name: formValues.Client_Name,
              User_Username: formValues.Client_Name,
              Client_UID: Client_UID
            };
            this.authService.registerClient(clientDetails).subscribe(authClient => {
              this.closeModal();
              this.alertService.success('An activation link has been sent to the client!');
              this.success.emit(true);
            }, error => {
              this.closeModal();
              this.alertService.error(error);
            });
          }); 
        }, error => {
          this.closeModal();
          this.alertService.error(error);
        });

      }, error => {
        this.closeModal();
        this.alertService.error(error);
      });
  };


  createForm(): void {
    this.addClientsForm = this.formBuilder.group({
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
      Client_PUID: [null],
      Integration_Connection_TypeID: [null, Validators.required],
      Integration_Connection_SSTR5: [null, Validators.required],
      Integration_Connection_MSTR5: [null, Validators.required] 
    }, { validator: this.validateEmail.bind(this) });
  };


  closeModal() {
    this.closeModalBtn.nativeElement.click();
    this.addClientsForm.reset();
  }

  private validateEmail(form: FormGroup){
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(form.controls['Client_InvoiceEmail'].value && !EMAIL_REGEXP.test(form.controls['Client_InvoiceEmail'].value)){
      return { emailValidate: true };
    }
    return null;
  };
}
