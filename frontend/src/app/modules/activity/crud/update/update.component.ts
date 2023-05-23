import {Component, Inject} from '@angular/core';
import {NewComponent} from "../new/new.component";
import {MatSelectChange} from "@angular/material/select";


@Component({
    selector: 'app-activity-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent extends NewComponent {
   subPhasesNames2: string[] = [];
      subPhasesParent: string[] = [];

  override submit() {

console.log(this.formValue);
   this.service.update(this.idx,this.formValue,"activity").subscribe(() => {
        this.toastr.success('activity  updated Successfully');
          setTimeout(() => {
              this.dialogref.close();
      }, 500);
          });
  }

  loadData(id: any) {
    this.idx= id;

    let data :any;
    this.service.getById(id,"activity").subscribe(res => {
      data = res
        this.Form.patchValue({
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        realStartDate: data.realStartDate,
        realEndDate: data.realEndDate,
        posistion: data.posistion,
          cost: data.cost
      });
    });

}
     titleHandler() {
    this.title = 'Update activity  '+this.data.id;``
}

title:string='';
  override dataHandler(){
          let phaseId
               if (this.formValue.subPhase!==null&&this.formValue.subPhase!==''&&this.formValue.subPhase!=='-'){

                 phaseId = sessionStorage.getItem('selectedSubPhase-option');
               }
               else {
                 phaseId = sessionStorage.getItem('selectedPhase-option');
               }
                 delete this.formValue.subPhase;
               delete this.formValue.phase;
               this.formValue.phase = {
                  "id": phaseId
               }
                 if(this.formValue.posistion==null||this.formValue.posistion==""){
                    this.formValue.posistion = "-"
                  }
                  this.submit();
  }

  subPhasesNames:string[]=['-'];
  subPhasesIds:any;
  phasesIds:any;

  override ngOnInit() {
   this.subPhasesNames2=this.operations.getArray('subPhasesNames');
  this.subPhasesIds=  this.operations.getArray('subPhasesIds');
   this.phasesIds= this.operations.getArray('phasesIds');
   this.phasesNames= this.operations.getArray('phasesNames');
   this.subPhasesParent= this.operations.getArray('subPhasesParent');
     if (this.data.id != '' && this.data.id != null && this.data.id != 0){
      this.titleHandler() ;
      this.loadData(this.data.id);
      }

  }
    onOptionSelected($event: MatSelectChange) {
    this.operations.searchIdByName($event.value,this.phasesNames,this.phasesIds,'Phase-option');
    for (let i=0;i<this.subPhasesNames2.length;i++){
      if (this.subPhasesParent[i]==$event.value){
        this.subPhasesNames.push(this.subPhasesNames2[i]);
      }
    }
  }
  onOptionSelected2($event: MatSelectChange) {
    this.operations.searchIdByName($event.value,this.subPhasesNames2,this.subPhasesIds,'SubPhase-option');

  }
}
