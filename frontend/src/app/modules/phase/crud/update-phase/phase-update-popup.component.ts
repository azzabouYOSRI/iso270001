import {Component, Inject} from '@angular/core';

import {NewPhaseComponent} from "../new-phase/new-phase.component";


@Component({
    selector: 'app-phase-update',
  templateUrl: './phase-update.component.html',
  styleUrls: ['./phase-update.component.css']
})
export class UpdatePhaseComponent extends NewPhaseComponent {


  override submit() {
    console.log(this.formValue );
   this.service.update(this.idx,this.formValue,"phase").subscribe(() => {
if (this.formValue.isSubPhase === "true") {
        this.toastr.success('subPhase  updated Successfully');
      } else {
        this.toastr.success('phase  update Successfully');

      }
          setTimeout(() => {
              this.dialogref.close();
      }, 500);
          });
  }

  loadData(id: any) {
    this.idx= id;
    let phase :any;
    this.service.getById(id,"phase").subscribe(res => {
      phase = res
      if (phase.isSubPhase=="true"){
        this.phaseForm.patchValue({
        name: phase.name,
        description: phase.description,
        startDate: phase.startDate,
        endDate: phase.endDate,
        realStartDate: phase.realStartDate,
        realEndDate: phase.realEndDate,
        isSubPhase: phase.isSubPhase,
        parent: phase.parent.name,
        posistion: phase.posistion,
          cost: phase.cost
      });
      }
      else {
        this.phaseForm.patchValue({
        name: phase.name,
        description: phase.description,
        startDate: phase.startDate,
        endDate: phase.endDate,
        realStartDate: phase.realStartDate,
        realEndDate: phase.realEndDate,
        posistion: phase.posistion,
          cost: phase.cost
      });
      }

        this.phasesNames=this.operations.getArray('phasesNames');
    });

}
     titleHandler() {
    this.title = 'Update phase  '+this.data.id;
}



  override ngOnInit() {
     if (this.data.id != '' && this.data.id != null && this.data.id != 0){
      this.titleHandler() ;
      this.loadData(this.data.id);
      }
  }
}
