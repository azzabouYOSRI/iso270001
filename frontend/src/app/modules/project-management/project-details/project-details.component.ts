import {Component, OnInit} from '@angular/core';
import {BaseDetailsComponent} from "../../../utilities/imports/base-details/base-details.component";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent extends BaseDetailsComponent implements OnInit {
  clientName: string="";
static client:any;
  override ngOnInit(): void {
    this.endpoint = 'Project';
    super.ngOnInit();
    this.getUsers();
        setTimeout(() => {
               this.clientIdToName();

     },100);
  }
  static users: any;
  clientIdToName() {
    let ab:string="";
    for (const element of ProjectDetailsComponent.users) {
      if (element.idu  === ProjectDetailsComponent.project.client.idu ) {
        this.clientName=element.companyName;
      }
    }
  }
static project :any;
  private getUsers() {
    this.service.getAll("user").subscribe(res => {
      ProjectDetailsComponent.users = res;
    });
      this.service.getById(sessionStorage.getItem("sp"),"project").subscribe(res => {
      ProjectDetailsComponent.project = res;
    });
  }

    protected readonly Number = Number;
}
