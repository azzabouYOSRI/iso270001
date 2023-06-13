import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectDeletePopupComponent} from "../project-delete-popup/project-delete-popup.component";
import {ProjectUpdatePopupComponent} from "../project-update-popup/project-update-popup.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {ProjectDetailsComponent} from "../../project-details/project-details.component";

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css']
})
export class ProjectListingComponent extends BaseListingComponent implements OnInit,AfterViewInit{
    ngAfterViewInit(): void {
    this.preparation.storePhases()
    }


  override ngOnInit(): void {
    this.preparation.checkMembership()
    sessionStorage.setItem('selectedProject','0' );
    this.endpoint = "project";
     this.loadList(this.endpoint);
         this.preparation.checkPmExistence()
     sessionStorage.setItem('default','false' );
      sessionStorage.setItem('homeDefaultPm','false' );
    }


    isAdmin=sessionStorage.getItem('type')=='admin';


projectsRoles:any=[];

  override filter(list: any): any {
    let list2: any = [];
    let projects: string[] = this.operations.getArray('projects');
    let projectsAdmin: string[] = this.operations.getArray('projectsAdmin');
      let projectsRoles: string[] = this.operations.getArray('projectsRoles');
    if (sessionStorage.getItem('type')=='admin'){
      for (const element of list) {
        if (element.alternateId !== 'default') {
          list2.push(element);
        }
      }
        for (let i = 0; i < list.length; i++) {
            if (projectsRoles[i] == 'true') {
              list2[i].isPm = true;
            }
          }
        return list2
    }

    else {
      let userAdedToThemRole: any = [];
      let userAdedToThem: any = [];

      if (this.displayedColumns[2] == 'activeProject') {
        this.displayedColumns.splice(2, 1);
      }
      for (const element of list) {
        for (const element2 of projects) {
          if (element.idp == element2) {
            userAdedToThem.push(element);
            userAdedToThemRole.push(projectsRoles[projects.indexOf(element2)]);
          }
        }
      }

      this.projectsRoles = userAdedToThemRole;
      return userAdedToThem
    }
    }

  override displayedColumns: string[] = [ 'name','activeProject', 'details','projectMembers','phases','projectDep','update','delete'];

  d:any = ProjectDeletePopupComponent;
  u:any = ProjectUpdatePopupComponent;


  protected readonly ProjectDetailsComponent = ProjectDetailsComponent;
}

