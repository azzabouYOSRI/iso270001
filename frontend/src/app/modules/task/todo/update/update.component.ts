import {Component, Inject} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";
import {TodoListingComponent} from "../list-tasks/listing.component";


@Component({
    selector: 'app-activity-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
   subPhasesNames2: string[] = [];
      subPhasesParent: string[] = [];
  private idx: any;


        constructor(
    private builder: FormBuilder,
    private service: HttpService,
    private router: Router,
    private toastr: ToastrService,
    private operations: OperationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<TodoListingComponent>,
    private preparation: PreparationsService,
  ) {
  }
    Form = this.builder.group({
    url: this.builder.control(''),
    done: this.builder.control('')
  });

   submit() {

   this.service.update(this.idx,this.formValue,"subtask").subscribe(() => {
     if (this.formValue.done == true) {
        this.toastr.success('subtask  marked done');
      } else {
        this.toastr.success('subtask  updated');
     }
          setTimeout(() => {
              this.dialogref.close();
      }, 500);
          });
  }
static data:any;
  loadData(id: any) {
    this.idx= id;
    this.service.getById(id,"activity").subscribe(res => {
    UpdateComponent.data = res;
    });

}
formValue:any;

title:string='';

  formControl() {
    if (this.Form.valid) {
      this.formValue = this.Form.value;
      this.submit();
    }
  }

   ngOnInit() {
     if (this.data.id != '' && this.data.id != null && this.data.id != 0){
      this.loadData(this.data.id);
      }

  }

}
