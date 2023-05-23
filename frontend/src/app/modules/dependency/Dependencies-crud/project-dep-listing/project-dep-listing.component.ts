import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProjectDepDeletePopupComponent} from "../project-dep-delete-popup/project-dep-delete-popup.component";
import {ProjectDepUpdatePopupComponent} from "../project-dep-update-popup/project-dep-update-popup.component";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {Router} from "@angular/router";
import {NewProjectDepComponent} from "../new-project-Dep/new-project-dep.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {FormBuilder} from "@angular/forms";
import {PhaseDetailsComponent} from "../../../phase/crud/phase-details/phase-details.component";
import {DetailsComponent} from "../../dep-details/details.component";

@Component({
  selector: 'app-project-dep-listing',
  templateUrl: './project-dep-listing.component.html',
  styleUrls: ['./project-dep-listing.component.css']
})
export class ProjectDepListingComponent extends BaseListingComponent implements OnInit{


  override ngOnInit(): void {
    super.ngOnInit();
    this.endpoint = "project-dep";
    this.loadList(this.endpoint);
    this.titleHandler();    }

  override title : string = "title";

  override titleHandler(){
    this.title = "project "+ sessionStorage.getItem("selectedProject")+ " dependencies";
  }


  override filter(list:any) : string[] {
    let projectDeps : string[] = [];
    for (const element of list) {
      if (element.project.idp == sessionStorage.getItem("selectedProject")) {
        projectDeps.push(element);
      }
    }
    return projectDeps;
}

  override displayedColumns: string[] = [ 'name','details','update','delete'];

  c :any = NewProjectDepComponent;
  d:any = ProjectDepDeletePopupComponent;
  u:any = ProjectDepUpdatePopupComponent;
  protected readonly PhaseDetailsComponent = PhaseDetailsComponent;
  protected readonly DetailsComponent = DetailsComponent;
}

