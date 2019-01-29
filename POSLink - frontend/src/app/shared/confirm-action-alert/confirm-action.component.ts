import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirm-action-alert',
  template: `
  <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div class="modal-content">
    <div *ngIf="deleteTypeBulk === false" class="modal-body">
    <b>{{alertMsg}}</b>
    <p>{{alertData}}</p>
    </div>
    <div *ngIf="deleteTypeBulk === true" class="modal-body">
    <b>{{alertMsg}}</b>
    <p *ngFor="let item of alertData">{{item}}</p>
    </div>
    <div class="modal-footer">
      <button data-dismiss="modal" class="red btn btn-icon-text" (click)="confirmDelete()">{{ 'global.b_delete' | translate }}</button>
      <a data-dismiss="modal">{{ 'global.b_cancel' | translate }}</a>
    </div>
  </div>
  </div>
  </div>
`
})
export class ConfirmActionComponent  {

  @Output() confirmBulkDelete = new EventEmitter<any>();
  @Input() alertData;
  @Input() alertMsg;
  @Input() deleteTypeBulk;

  constructor(translate: TranslateService) {}

  confirmDelete()
  {
    this.confirmBulkDelete.emit(this.deleteTypeBulk);
  }
}

