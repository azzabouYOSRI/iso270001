import {Component, Inject} from '@angular/core';
import {NewProjectComponent} from "../new-project/new-project.component";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";
import {MatSelectChange} from "@angular/material/select";


@Component({
  selector: 'app-Project-update-popup',
  templateUrl: './project-update-popup.component.html',
  styleUrls: ['./project-update-popup.component.css']
})
export class ProjectUpdatePopupComponent extends NewProjectComponent{
  private static name2: any;

   constructor(
    protected override builder: FormBuilder,
    protected override service: HttpService,
    protected override router: Router,
    protected override toastr: ToastrService,
    protected override _operations:OperationsService,
    @Inject(MAT_DIALOG_DATA)  public  data: any,
    protected  dialogref: MatDialogRef<ProjectUpdatePopupComponent>,
    protected override preparation: PreparationsService,

) {
     super(builder,service,router,toastr,_operations,preparation)
   }

  titleHandler() {
this.service.getById(this.data.id, "project").subscribe(item => {
          let data: any;
          data = item;
          ProjectUpdatePopupComponent.name2 = data.name;
        });
        setTimeout(() => {
        this.title = "Project '" + ProjectUpdatePopupComponent.name2 + "' update";
      }, 100);
}
 loadProjectData(idp: any) {
    this.idx= idp;
    this.service.getById(idp,"project").subscribe(res => {
      this.project = res
      // @ts-ignore
      // @ts-ignore
      // @ts-ignore
      this.projectForm.patchValue({
        name: this.project.name,
        description: this.project.description,
        budget: this.project.budget,
        client: this.project.client.companyName,
        startDate: this.project.startDate,
        endDate: this.project.endDate,
        realStartDate: this.project.realStartDate,
        realEndDate: this.project.realEndDate,
        url: this.project.url,
        cost2: this.project.cost2
      });
    sessionStorage.setItem('idc',this.project.client.idu);
    });
}


  formControl() {

    if (this.projectForm.valid) {
      let str: string = <string>this.projectForm.value.budget;
      if (this._operations.checkPriceFormat(str)) {
        this.toastr.warning('budget not valid')
      }
      this.formValue = this.projectForm.value;
      let b: any;
      let startDate:any;
      let endDate:any;
      let realStartDate:any;
      let realEndDate:any;
      if (this.formValue.startDate !== null && this.formValue.startDate !== '') {
         startDate = new Date(this.formValue.startDate);
      }
      if (this.formValue.endDate !== null && this.formValue.endDate !== '') {
         endDate = new Date(this.formValue.endDate);
      }
      if (this.formValue.realStartDate !== null && this.formValue.realStartDate !== '') {
         realStartDate = new Date(this.formValue.realStartDate);
      }
      if (this.formValue.realEndDate !== null && this.formValue.realEndDate !== '') {
         realEndDate = new Date(this.formValue.realEndDate);
      }

      if (startDate > endDate) {
        this.toastr.warning('start date must be before end date');
        return;
      }
      if (startDate  > realEndDate) {
        this.toastr.warning('real start date must be after  start date');
        return;
      }
       if (endDate  > realEndDate) {
        this.toastr.warning('real end date must be after  end date');
        return;
      }
      if (realStartDate > realEndDate) {
        this.toastr.warning('real start date must be before real end date');
        return;
      }
      this.dataHandler();
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }


  override submit() {
         this.formValue.cost2= this.formValue.cost;
         this.service.update(this.idx, this.formValue,"project").subscribe(() => {
      this.toastr.success('Updated successfully.');
      // this.preparation.storeCompanyNames();
    setTimeout(() => {
            this.dialogref.close();
    }, 1000);
    });
  }

  override ngOnInit() {
    super.ngOnInit();
     if (this.data.id != '' && this.data.id != null) {
      this.titleHandler() ;
      this.loadProjectData(this.data.id);
      }
  }

  override onOptionSelected($event: MatSelectChange) {

  }
  private dataHandler() {
    this.companyName = this.projectForm.value.client;
        delete this.formValue.client;
        this.formValue.client = {

          idu: sessionStorage.getItem('idc')
        }

                this.formValue.endDate = new Date(this.formValue.endDate);
                this.formValue.realStartDate = new Date(this.formValue.realStartDate);
                this.formValue.startDate = new Date(this.formValue.startDate);
                this.formValue.realEndDate = new Date(this.formValue.realEndDate);
        this.submit();
  }
}
