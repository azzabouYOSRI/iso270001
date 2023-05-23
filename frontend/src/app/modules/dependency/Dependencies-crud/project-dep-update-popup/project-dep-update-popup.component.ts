import {Component, Inject, OnInit} from '@angular/core';

import {NewProjectDepComponent} from "../new-project-Dep/new-project-dep.component";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
    selector: 'app-project-dep-update-popup',
  templateUrl: './project-dep-update-popup.component.html',
  styleUrls: ['./project-dep-update-popup.component.css']
})
export class ProjectDepUpdatePopupComponent extends NewProjectDepComponent implements OnInit {

     constructor(
    protected override builder: FormBuilder,
    protected override service: HttpService,
    protected override router: Router,
    protected override toastr: ToastrService,
    protected override _operations:OperationsService,
    @Inject(MAT_DIALOG_DATA)  public override  data: any,
    protected override  dialogref: MatDialogRef<ProjectDepUpdatePopupComponent>,

) {
     super(builder,service,router,toastr,_operations,data,dialogref)
   }


     loadProjectDepData(idpd: any) {
    this.idx= idpd;
    this.service.getById(idpd,"project-dep").subscribe
    (res => {
      this.projectDep = res
      this.DependencyForm.patchValue({
        name: this.projectDep.name,
        description: this.projectDep.description,
        cost: this.projectDep.cost,
        type: this.projectDep.type,
      });});

}
     titleHandler() {
    this.title = 'Update Project dependency  '+ this.data.id;
}
 ngOnInit() {
     if (this.data.id != '' && this.data.id != null && this.data.id != 0){
      this.titleHandler() ;
      this.loadProjectDepData(this.data.id);
      }

  }

  override submit(idx:number) {
   this.service.update(idx,this.formValue,"project-dep").subscribe(() => {
        this.toastr.success('Project Dependency Added Successfully');
          });
  }
static cost2 :any;
   fixdepency() {

  setTimeout(() => {
      let p :any ;
      let pd :any ;
      this.service.getById(sessionStorage.getItem('selectedProject'), "project").subscribe((data) => {
    p = data;
    ProjectDepUpdatePopupComponent.cost = p.cost;

      });
         this.service.getById(this.idx, "project-dep").subscribe((data) => {
    p = data;
    ProjectDepUpdatePopupComponent.cost = p.cost;

      });
     }, 100);
    setTimeout(() => {

    let cost = Number(ProjectDepUpdatePopupComponent.cost) - Number(ProjectDepUpdatePopupComponent.cost2);
    cost = Number(cost) + Number(this.formValue.cost);
      let id:any =sessionStorage.getItem('selectedProject')
    this.service.update(id,cost, "project").subscribe(() => {
      this.toastr.success('Project cost updated Successfully');
    });
           }, 200);

}

}
