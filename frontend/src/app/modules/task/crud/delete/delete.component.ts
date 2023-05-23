import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {BaseDeletePopupComponent} from "../../../../utilities/imports/base-delete-popup/base-delete-popup.component";

@Component({
  selector: 'app-task-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent extends BaseDeletePopupComponent  {




override ngOnInit() {
    this.endpoint = 'task';
    super.ngOnInit();
  }

}

