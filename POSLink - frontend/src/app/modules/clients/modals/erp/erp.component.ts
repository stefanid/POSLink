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
import { ErpService } from './erp-service.service';

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html'
})
export class ErpComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  @Output() success = new EventEmitter<boolean>();
  @Input() selectedClient: any;
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;
  headers:any;
  selectedValue: Boolean;
  Header_UID:any;
  selectedHeaderUID: any = {};
  syncDatas: any;
  constructor(private erpService: ErpService,
    private alertService: AlertService,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  getHeaders() {
    let System_Client_UID = this.selectedClient.System_Client_UID;
    this.erpService.getHeaders(System_Client_UID).subscribe(headers => {
      this.headers = headers.response;
    }, error => {
      console.log(error);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedClient.System_Client_UID) {
      var checkValue = JSON.parse(JSON.stringify(this.selectedClient, function (key, value) { return (value === '-') ? null : value }));
      this.getHeaders();
     
    }

  }
  closeModal() {
    this.closeModalBtn.nativeElement.click();
  }

  getSyncData() {
    let System_Client_UID = this.selectedClient.System_Client_UID;
    let Header_UID = this.Header_UID
    
    this.erpService.getSyncData(Header_UID, System_Client_UID).subscribe(syncData => {
      console.log(syncData)
        this.syncDatas = syncData.response;
    }, error => {
      console.log(error);
    });
  }

  selectHeader(Header_UID) {
    this.selectedHeaderUID = Header_UID;
  }

  onChange(newValue){
    if(newValue != "Header Number"){
      this.selectedValue = true;
      this.Header_UID = newValue;
      this.getSyncData();
    } else {
      this.selectedValue = false;
      this.syncDatas = null;
     
    }
  }

  onSuccessAddOrUpdate(event) {
    this.getSyncData();
  }

}
