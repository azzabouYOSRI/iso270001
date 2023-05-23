import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {BaseDeletePopupComponent} from "../../../../utilities/imports/base-delete-popup/base-delete-popup.component";

@Component({
  selector: 'app-phase-delete',
  templateUrl: './delete-phase.component.html',
  styleUrls: ['./delete-phase.component.css']
})
export class DeletePhaseComponent extends BaseDeletePopupComponent  {




override ngOnInit() {
    this.endpoint = 'phase';
    super.ngOnInit();
  }

}

