import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";

@Component({
  selector: 'app-activity-activity',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  user: any;
  stardate2 = new FormControl('', Validators.required);
  endDate2 = new FormControl('');
  realEndDate2 = new FormControl('');
  realStarDate2 = new FormControl('');
  startDateui = new Date(2023, 1, 1);

  formValue: any;
  Form = this.builder.group({
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    posistion: this.builder.control(''),
    startDate: this.stardate2,
    endDate: this.endDate2,
    realStartDate:this.realStarDate2,
    realEndDate: this.realEndDate2,
    phase: this.builder.control(''),
    subPhase: this.builder.control(''),
    cost: this.builder.control('')
  });
  phasesNames: any;
  subPhaseGate: boolean = false;
  parent: any;
  protected idx: any;

  constructor(
    protected builder: FormBuilder,
    protected service: HttpService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _operations: OperationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogref: MatDialogRef<NewComponent>,
    private preparation: PreparationsService,
  ) {
  }

  get operations(): OperationsService {
    return this._operations;
  }

  set operations(value: OperationsService) {
    this._operations = value;
  }

  ngOnInit(): void {
    this.phasesNames = this.operations.getArray('phasesNames');
  }

  formControl() {

    if (this.Form.valid) {
      this.formValue = this.Form.value;
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


  dataHandler(){
                let id :number;
                 id = Number(sessionStorage.getItem('selectedPhase'));
                  this.formValue.phase = {
                    "id": id
                  };
  if(this.formValue.posistion==null||this.formValue.posistion==""){
                    this.formValue.posistion = "-"
                  }
                  this.submit();
  }


  submit() {
    this.formValue.progress = 0;
    delete this.formValue.subPhase;
    console.log(this.formValue);
    this.service.add(this.formValue, "activity").subscribe(() => {
        this.toastr.success('activity  Added Successfully');
      setTimeout(() => {
        this.dialogref.close();
      }, 500);
    });
  }


}
