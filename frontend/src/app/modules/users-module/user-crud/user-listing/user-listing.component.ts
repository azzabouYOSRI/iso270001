import {Component, OnInit} from '@angular/core';
import {UpdatePopupComponent} from "../update-popup/update-popup.component";
import {ConfirmationComponent} from "../delete-popup/confirmation/confirmation.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {NewProjectDepComponent} from "../../../dependency/Dependencies-crud/new-project-Dep/new-project-dep.component";
import {
  ProjectDepDeletePopupComponent
} from "../../../dependency/Dependencies-crud/project-dep-delete-popup/project-dep-delete-popup.component";
import {
  ProjectDepUpdatePopupComponent
} from "../../../dependency/Dependencies-crud/project-dep-update-popup/project-dep-update-popup.component";

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent extends BaseListingComponent implements OnInit {
  c: any = NewProjectDepComponent;
  d: any = ProjectDepDeletePopupComponent;
  u: any = ProjectDepUpdatePopupComponent;
  override displayedColumns: string[] = [ 'name', 'lastname', 'email', 'typeOfUser', 'phone', 'gender', 'activeAccount', 'companyname', 'update', 'delete', 'resetPassword'];
  keyword: string = ''
  selectedField: string = '';
  fields: string[] = [ 'name', 'lastname', 'email', 'typeOfUser', 'phone', 'gender', 'activeAccount', 'companyname'];


  override update(id: any) {
    this.openDialog('1000ms', '600ms', id, UpdatePopupComponent);
  }

  override delete(id: any) {
    this.openDialog('1000ms', '600ms', id, ConfirmationComponent);
  }

  resetPassword(id: any) {
    this.openDialog('1000ms', '600ms', id, ResetPasswordComponent);
  }

  override filter(list: any[]) {
    const filteredList = [];
    switch (this.selectedField) {
      case 'name': {
        for (const element of list) {
          if (element.name.includes(this.keyword)) {
            filteredList.push(element);
          }
        }
        return filteredList;
      }
      case 'lastname': {
        for (const element of list) {
          if (element.lastname.includes(this.keyword)) {
            filteredList.push(element);
          }
        }
        return filteredList;
      }
      case 'email': {
        for (const element of list) {
          if (element.email.includes(this.keyword)) {
            filteredList.push(element);
          }
        }
        return filteredList;
      }
      case 'typeOfUser': {
        for (const element of list) {
          if (element.typeOfUser.includes(this.keyword)) {
            filteredList.push(element);
          }
        }
        return filteredList;
      }
      case 'phone': {
        for (const element of list) {
          if (element.phone.includes(this.keyword)) {
            filteredList.push(element);
          }
        }
        return filteredList;
      }
      case 'comapnyname': {
        for (const element of list) {
          if (element.companyname.includes(this.keyword)) {
            filteredList.push(element);
          }
        }
        return filteredList;
      }
      case 'activeAccount': {
        for (const element of list) {
          if (element.activeAccount.toString().includes(this.keyword)) {
            filteredList.push(element);
          }
        }
      }
        return filteredList;

      default: {
        return list;
      }
    }
  }

  override ngOnInit(): void {
    if (sessionStorage.getItem('type') == "admin") {
      this.endpoint = 'user';
      this.loadList(this.endpoint);
    }
  }

  onSubmit() {
    if (this.filterForm.valid) {
      this.keyword = <string>this.filterForm.value.keyword;
      this.selectedField = <string>this.filterForm.value.field;
      this.loadList(this.endpoint);
    }
  }
}

