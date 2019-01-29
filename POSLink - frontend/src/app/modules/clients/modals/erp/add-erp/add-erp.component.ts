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
import { AlertService } from '../../../../../shared/alert/alert.service';
import { ErpService } from '../erp-service.service';


@Component({
  selector: 'app-add-erp',
  templateUrl: './add-erp.component.html'
})
export class AddErpComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  @Output() success = new EventEmitter<boolean>();
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;
  @Input() selectedHeaderUID: any;
  @Input() selectedClient: any;
  headerTypes: any;
  selectedType: any;
  headerReportData: any;
  addErpData: FormGroup;
  public successUpdateMsg: string;
  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private erpService: ErpService,
    private translate: TranslateService) {
    this.createForm();
    translate.get('t_success_client_updated').subscribe((res: string) => {
      this.successUpdateMsg = res;
    });
  }

  ngOnInit() {
   
  }

  createForm(): void {
    this.addErpData = this.formBuilder.group({
      Client_ERPSyncCFG_ItemID: ['', Validators.required],
      Client_ERPSyncCFG_AccountID: [null, Validators.required],
      Client_ERPSyncCFG_TypeID: [null, Validators.required]
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedHeaderUID != undefined) {
      this.erpService.getHeadersType(this.selectedHeaderUID).subscribe(types => {
        this.headerTypes = types.response;
        console.log(this.headerTypes);
      }, error => {
        console.log(error);
      });
    }

  }
  closeModal() {
    this.closeModalBtn.nativeElement.click();
    this.addErpData.reset();
  }

  typeChanged(newValue) {
    if (newValue != "") {
      this.headerReportData = null;
      this.selectedType = newValue;
       this.erpService.getReportData(this.selectedHeaderUID, newValue, this.selectedClient.System_Client_UID).subscribe(headerData => {
       
        this.headerReportData = headerData.response;
      }, error => {
        console.log(error);
      }); 
    } else {
      this.selectedType = false;
    }
  }

  itemChanged(newValue){
    console.log("item", newValue);
    console.log("type", this.selectedType);
  }

  addNewErp() {
    var formValues = this.addErpData.value;
    let erpData = {
      System_Client_UID: this.selectedClient.System_Client_UID,
      Client_ERPSyncCFG_ItemID: formValues.Client_ERPSyncCFG_ItemID,
      Client_ERPSyncCFG_AccountID: formValues.Client_ERPSyncCFG_AccountID,
      Client_ERPSyncCFG_TypeID: formValues.Client_ERPSyncCFG_TypeID
    }
    this.erpService.addSyncData(erpData).subscribe(returnData => {
      this.closeModal();
      this.alertService.success('Success');
      this.success.emit(true);
    }, error => {
      this.closeModal();
      this.alertService.error(error);
    });  
  }
  

}
