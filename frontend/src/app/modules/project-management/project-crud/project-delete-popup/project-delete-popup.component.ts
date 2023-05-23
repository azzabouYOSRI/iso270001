import {Component, Inject, OnInit} from '@angular/core';
import {BaseDeletePopupComponent} from "../../../../utilities/imports/base-delete-popup/base-delete-popup.component";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";

@Component({
  selector: 'app-project-delete-popup',
  templateUrl: './project-delete-popup.component.html',
  styleUrls: ['./project-delete-popup.component.css']
})
export class ProjectDeletePopupComponent extends BaseDeletePopupComponent {

  override ngOnInit(): void {
    this.preparation.checkMembership();
    this.endpoint = 'project';
    super.ngOnInit();
  }



}

