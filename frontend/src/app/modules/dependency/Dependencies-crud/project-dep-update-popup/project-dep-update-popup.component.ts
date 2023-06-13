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
  private static name2: any;

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
     this.service.getById(this.data.id, "project-dep").subscribe(item => {
          let data: any;
          data = item;
          ProjectDepUpdatePopupComponent.name2 = data.name;
        });
        setTimeout(() => {
        this.title = "Dependency '" + ProjectDepUpdatePopupComponent.name2 + "' update";
      }, 100);
     }
 ngOnInit() {
     if (this.data.id != '' && this.data.id != null && this.data.id != 0){
      this.titleHandler() ;
      this.loadProjectDepData(this.data.id);
      }

  }

  override submit(idx:number) {
               this.fixdepency();
   this.service.update(idx,this.formValue,"project-dep").subscribe(() => {
        this.toastr.success('Project Dependency Added Successfully');
        this.dialogref.close();
          });
  }
static cost3 :any;
   fixdepency() {
     let cost4 : number = 0;

  setTimeout(() => {
      let p :any ;
      let pd :any ;
      this.service.getById(sessionStorage.getItem('selectedProject'), "project").subscribe((data) => {
    p = data;
    ProjectDepUpdatePopupComponent.cost2 = p.cost2;

      });
         this.service.getById(this.idx, "project-dep").subscribe((data) => {
    p = data;
    ProjectDepUpdatePopupComponent.cost3 = p.cost;

      });
     }, 100);
    setTimeout(() => {
    let cost5 :number = (Number(ProjectDepUpdatePopupComponent.cost2) - Number(ProjectDepUpdatePopupComponent.cost3));
    setTimeout(() => {
       // cost4 = Number(cost) + ;
      // cost4 = this.operations.calcul(Number(this.formValue), cost);
      // console.log(this.formValue.cost);
      let id:any =sessionStorage.getItem('selectedProject')
      sessionStorage.setItem('costy',String(cost5));
    this.service.update(id,{cost:cost5}, "project").subscribe(() => {
      this.toastr.success('Project cost updated Successfully');
    });
          },100)
           }, 200);

    setTimeout(() => {
            let id:any =sessionStorage.getItem('selectedProject')
let cost6= Number (sessionStorage.getItem('costy'))+Number(this.formValue.cost);
 this.service.update(id,{cost2:cost6}, "project").subscribe(() => {
      this.toastr.success('Project cost updated Successfully');
    });
    },300)
}

}
