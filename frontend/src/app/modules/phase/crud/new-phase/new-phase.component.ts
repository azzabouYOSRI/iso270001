import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";
import {identifierOfNode} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

@Component({
  selector: 'app-new-phase',
  templateUrl: './new-phase.component.html',
  styleUrls: ['./new-phase.component.css']
})
export class NewPhaseComponent implements OnInit {
  user: any;
  date:any =new Date();
  stardate2 = new FormControl(this.date, Validators.required);
  endDate2 = new FormControl('');
  realEndDate2 = new FormControl('');
  realStarDate2 = new FormControl('');
  startDateui = new Date(2023, 1, 1);

  formValue: any;
  title: string = 'Add New Project Dependency';
  isSubPhase: boolean = false;
  phaseForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    posistion: this.builder.control(0),
    startDate: this.stardate2,
    endDate: this.endDate2,
    realStartDate:this.realStarDate2,
    url: this.builder.control(''),
    realEndDate: this.realEndDate2,
    isSubPhase: this.builder.control(false),
    parent: this.builder.control(''),
    cost: this.builder.control(0)

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
    protected dialogref: MatDialogRef<NewPhaseComponent>,
    protected preparation: PreparationsService,
  ) {

  }
  get operations(): OperationsService {
    return this._operations;
  }

  set operations(value: OperationsService) {
    this._operations = value;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('subphaseTypeSwitch')=='switchToNormal'){
    this.phasesNames = this.operations.getArray('phasesNames');
    console.log(this.phasesNames)
      console.log('normal')
    }
    else if(sessionStorage.getItem('subphaseTypeSwitch')=='switchToDefault') {
      this.phasesNames = this.operations.getArray('phasesNamesDefault')
          console.log(this.phasesNames)
      console.log('default')
    }
  }

  formControl() {

    if (this.phaseForm.valid) {
      this.formValue = this.phaseForm.value;
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
                  let idp :any ;
                 idp =   sessionStorage.getItem('selectedProject');
                  this.formValue.project = {
                    idp: idp
                  };
                  if (this.subPhaseGate) {
                    this.parent = this.formValue.parent;
                    delete this.formValue.parent;
                    this.formValue.parent = {
                      id: this._operations.lookupPhaseName(this.parent)
                    }
                    this.formValue.isSubPhase = "true";
                  } else {
                    delete this.formValue.parent;
                    this.formValue.isSubPhase = "false";
                  }
                  if(this.formValue.posistion==null||this.formValue.posistion==""){
                    this.formValue.posistion = "-"
                  }
                  this.submit();
  }

  isSubPhaseHandler($event: MatCheckboxChange) {
    if ($event.checked) {
      this.subPhaseGate = true;
      sessionStorage.setItem('isSubPhase', 'true');
    } else {
      this.subPhaseGate = false;
      sessionStorage.setItem('isSubPhase', 'false');
    }
  }

  submit() {
                      this.formValue.progress = 0;
                        if(this.formValue.cost==null||this.formValue.cost=="")
    {
      this.formValue.cost=0;
    }
                      this.formValue.alternateId=this._operations.generateAlternateId();
    this.service.add(this.formValue, "phase").subscribe(() => {
      if (this.formValue.isSubPhase === "true") {
        this.toastr.success('subPhase  Added Successfully');

      } else {
        this.toastr.success('phase  Added Successfully');

      }
      setTimeout(() => {
        this.dialogref.close();
      }, 500);
    });
  }


}
