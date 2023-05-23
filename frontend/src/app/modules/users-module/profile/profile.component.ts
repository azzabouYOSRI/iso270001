import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../utilities/service/auth/auth.service";
import {UpdatePopupComponent} from "../user-crud/update-popup/update-popup.component";
import {UserListingComponent} from "../user-crud/user-listing/user-listing.component";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {HttpService} from "../../../utilities/service/http/http.service";
import {BaseDetailsComponent} from "../../../utilities/imports/base-details/base-details.component";
import {OperationsService} from "../../../utilities/service/operations/operations.service";
import {password} from "./change-password/password.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    this.service.getById(sessionStorage.getItem("idu"), 'user').subscribe((res: any) => {
      ProfileComponent.user = res;
  });
    setTimeout(() => {
    this.Data = ProfileComponent.user;
       this.Data= this.operations.replaceNullsWithDash(this.Data);
    }, 150);

  }
  static user: any;
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private service: HttpService,
    private operations: OperationsService
  ) {
  }
  Data:any;


  changePassword() {
    this.operations.openDialog('1000ms', '600ms', sessionStorage.getItem("idu"), password)

  }


  updatInfo() {
    sessionStorage.setItem("up", "true");
      this.operations.openDialog('1000ms', '600ms', sessionStorage.getItem("idu"), UpdatePopupComponent)
  }
}
