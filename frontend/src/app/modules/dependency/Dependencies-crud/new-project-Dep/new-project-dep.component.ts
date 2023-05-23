import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectDepUpdatePopupComponent} from "../project-dep-update-popup/project-dep-update-popup.component";

@Component({
  selector: 'app-new-project-dep',
  templateUrl: './new-project-dep.component.html',
  styleUrls: ['./new-project-dep.component.css']
})
export class NewProjectDepComponent {
  user: any;
  types: string[] = ['standard', 'framework', 'logistic', 'other'];
  private cost: number = 0;
  formValue: any;
  protected idx: any;
  protected projectDep: any;
  protected title:string = 'Add New Project Dependency';

  get operations(): OperationsService {
    return this._operations;
  }

  set operations(value: OperationsService) {
    this._operations = value;
  }

  constructor(
    protected builder: FormBuilder,
    protected service: HttpService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _operations: OperationsService,
        @Inject(MAT_DIALOG_DATA)  public  data: any,
    protected  dialogref: MatDialogRef<NewProjectDepComponent>,

  ) {
  }


  DependencyForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    cost: this.builder.control('0', Validators.compose([Validators.required,Validators.pattern('^[ \s\.\s\/0-9]*$')]),),
    type: this.builder.control('', Validators.required),
    url: this.builder.control(''),
  });


  proceedAdd() {


    if (this.DependencyForm.valid) {
      const str: string = <string>this.DependencyForm.value.cost;
      if (this._operations.checkPriceFormat(str)) {
        this.toastr.warning('cost not valid')
      } else {
        this.formValue = this.DependencyForm.value;
        this.formValue.project = {
          idp: sessionStorage.getItem('selectedProject')
        };
        this.submit(0);

      }
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
static cost:any;
  submit(idx: number) {
    this.service.add(this.formValue, "project-dep").subscribe(() => {
      this.toastr.success('Project Dependency Added Successfully');
    });
    setTimeout(() => {
      let p :any ;
      this.service.getById(sessionStorage.getItem('selectedProject'), "project").subscribe((data) => {
    p = data;
    NewProjectDepComponent.cost = p.cost;
      });
     }, 100);
    setTimeout(() => {

    let cost = this.formValue.cost+NewProjectDepComponent.cost;
      let id:any =sessionStorage.getItem('selectedProject')
    this.service.update(id,{cost:cost}, "project").subscribe(() => {
      // this.toastr.success('Project cost updated Successfully');
    });
           }, 200);

  }



}
