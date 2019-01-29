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
import { FileService } from '../../file-service.service';

@Component({
  selector: 'app-file-details-modal',
  templateUrl: './file-details.component.html'
})
export class FileDetailsModalComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  @Input() selectedTerminal: any;
  files: any;
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;
  constructor(private alertService: AlertService,
              private translate: TranslateService,
              private fileService: FileService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('im here', this.selectedTerminal);
   var Client_UID = this.selectedTerminal.System_Client_UID;
   this.getTopFiles(Client_UID);

  }

  getTopFiles(Client_UID){
    this.fileService.getTopFiles(Client_UID).subscribe(data => {
      this.files = data;
      for (let i = 0; i < this.files.length; i++) {
        this.files[i].System_File_CreateDate = new Date(this.files[i].System_File_CreateDate).toLocaleString();
        
      }
    }, error => {
      this.alertService.error(error);
    });
  }
  closeModal() {
    this.closeModalBtn.nativeElement.click();
  }


}
