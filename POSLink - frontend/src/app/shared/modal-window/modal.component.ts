import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  template:`  
  <div class="modal fade" id="globalModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="cancel()">Close</button>
        <button type="button" class="first-color btn btn-icon-text" (click)="ok()">Save changes</button>
      </div>
    </div>
  </div>
</div>
`
})
export class ModalComponent implements OnInit {
  constructor() { }

  @Input() oldname = "";
  @Output() close = new EventEmitter<string>();
  newname = "";

  ngOnInit() {
      // copy all inputs to avoid polluting them
      this.newname = this.oldname; 
  }

  ok() {
      this.close.emit(this.newname);
  }

  cancel() {
      this.close.emit(null);
  }
}
