import {Component, Input, OnInit} from '@angular/core';
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {MemberDeleteComponent} from "../Member-delete/Member-delete.component";
import {NewMemberComponent} from "../new-member/new-member.component";
import {  ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-member-listing',
  templateUrl: './Member-listing.component.html',
  styleUrls: ['./Member-listing.component.css']
})
export class MembersListingComponent extends BaseListingComponent implements OnInit   {


  isPm: boolean = false;
  pm: boolean = false;
  c: any = NewMemberComponent;
  d: any = MemberDeleteComponent;
  override displayedColumns: string[] = [ 'name', 'lastname', 'type','companyName', 'email', 'phone', 'delete'];
  private static name2: any;

  override ngOnInit(): void {
    this.endpoint = "member";
        super.ngOnInit();
    this.loadList(this.endpoint);
    this.titleHandler();
    this.allowAddMember = this.operations.isPmHandler();
    this.preparation.storeMembersNames();
    this.preparation.storeUserNames();
    this.allowDeleteHandler();
  }

  override titleHandler() {
          this.service.getById(sessionStorage.getItem("selectedProject"), "project").subscribe(item => {
          let data: any;
          data = item;
          MembersListingComponent.name2 = data.name;
        });
        setTimeout(() => {
        this.title = "Project " + MembersListingComponent.name2 + " members";
      }, 100);
  }

  // @ts-ignore
  override filter(list: any): any[] {
    this.allowAddMember = this.operations.isPmHandler();
    let object: any = [];
    for (const element of list) {
      if (element.project.idp.toString() == sessionStorage.getItem("selectedProject")) {

        object.push(element);
      }
    }
    object = this.operations.transformationMemberListing(object);
    return object;
  }

  fixDelete(idu: any) {
    let id: any
    let isPm: any;
    this.service.getidbyidu(idu, "member").subscribe((member: any) => {
      for (const element of member) {
        if (element.project.idp == sessionStorage.getItem("selectedProject") && element.user.idu == idu)
          id = element.id;
        isPm = element.isPm;
      }
      if (isPm == 'true') {
        sessionStorage.setItem('toDeletedPm', 'true')
      } else {
        sessionStorage.setItem('toDeletedPm', 'false')
      }
      this.delete(id, this.d);
    });
  }

  addMember() {
    sessionStorage.setItem('add', 'member')
    this.createNew(this.c)
  }

  addPm() {
    sessionStorage.setItem('add', 'pm')
    this.createNew(this.c);
  }
//   allowAddPm2(): boolean {
//     let bool:boolean=false;
//     let idp:any = sessionStorage.getItem('selectedProject');
//     this.service.getbyidp(idp,"member").subscribe((data:any) => {
//       let members:any = data;
//       let i=0;
//       while (i<members.length&&!bool){
//         console.log(members[i].isPm)
//         if (members[i].isPm=='true'){
//           bool=true;
//           break;
// }
//         i++;
//       }
//     });
//     return bool;
// }
  allowDelete: boolean=false;
  allowDeleteHandler(){
    if(sessionStorage.getItem("type")=="admin"||this.allowAddMember){
      this.allowDelete=true;
    }
  }

}

