import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseDeletePopupComponent} from "../../../../utilities/imports/base-delete-popup/base-delete-popup.component";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";

@Component({
  selector: 'app-member-delete-popup',
  templateUrl: './Member-delete.component.html',
  styleUrls: ['./Member-delete.component.css']
})
export class MemberDeleteComponent  extends BaseDeletePopupComponent {



  override ngOnInit() {
    this.endpoint = 'member';
    super.ngOnInit();
     this.preparation.storeMembersNames();
    this.preparation.storeUserNames();
  }

  override loadData(id: any, endpoint: string) {
    this.idx = id;
    this.service.getById(id, this.endpoint).subscribe(res => {
      this.object = res
      this.message = "Are you sure you want to remove " + this.object.user.name + " " + this.object.user.lastname + " ?"
      ;
    });
  }


}
