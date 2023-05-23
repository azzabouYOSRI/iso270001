import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {BaseDeletePopupComponent} from "../../../../utilities/imports/base-delete-popup/base-delete-popup.component";

@Component({
  selector: 'app-project-delete-popup',
  templateUrl: './project-dep-delete-popup.component.html',
  styleUrls: ['./project-dep-delete-popup.component.css']
})
export class ProjectDepDeletePopupComponent extends BaseDeletePopupComponent  {




override ngOnInit() {
    this.endpoint = 'project-dep';
    super.ngOnInit();
  }
static cost:any;
static cost2:any;

override fixdepency() {

  setTimeout(() => {
      let p :any ;
      let pd :any ;
      this.service.getById(sessionStorage.getItem('selectedProject'), "project").subscribe((data) => {
    p = data;
    ProjectDepDeletePopupComponent.cost = p.cost;

      });
         this.service.getById(this.idx, "project-dep").subscribe((data) => {
    p = data;
    ProjectDepDeletePopupComponent.cost = p.cost;

      });
     }, 100);
    setTimeout(() => {

    let cost = Number(ProjectDepDeletePopupComponent.cost) - Number(ProjectDepDeletePopupComponent.cost2);
      let id:any =sessionStorage.getItem('selectedProject')
    this.service.update(id,cost, "project").subscribe(() => {
      this.toastr.success('Project cost updated Successfully');
    });
           }, 200);

}
}

