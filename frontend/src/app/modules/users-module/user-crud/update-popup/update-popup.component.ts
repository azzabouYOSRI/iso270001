import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {HttpService} from "../../../../utilities/service/http/http.service";
import {RegisterComponent} from "../register/register.component";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";


@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent extends RegisterComponent implements OnInit {
  private user: any;
  private idx: any;
  admin: boolean = false;
  title: string="update user";
  titleHandler() {
    if (!this.admin || sessionStorage.getItem("up") == "true")
      this.title = "Account info update";
  }

  adminHandler() {
    if (sessionStorage.getItem("type") == "admin") {
      this.admin = true;
    }
  }
  constructor(
    protected override builder: FormBuilder,
    protected override service: HttpService,
    protected override toastr: ToastrService,
    protected dialogref: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected  operation: OperationsService,
  ) {
super(builder,service,toastr,operation);
  }

  override proceedSave() {
   this.service.update(this.idx, this.userForm.value,"user").subscribe(() => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }
loadData(id: any) {
    this.idx= id;
    this.service.getById(id,"user").subscribe(res => {
      this.user = res
      this.userForm.patchValue({
        phone: this.user.phone,
        name: this.user.name,
        companyName: this.user.companyName,
        lastname: this.user.lastname,
        email: this.user.email,
        typeOfUser: this.user.typeOfUser,
        activeAccount: this.user.activeAccount,
        gender: this.user.gender,
        password: this.user.password,
      });});
}

  ngOnInit(): void {
    this.adminHandler();
    this.titleHandler();
    if (this.data.id != '' && this.data.id != null) {
      this.loadData(this.data.id);
    }
  }

}
