import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  static user: any;
  static idpn: any;
  static allPhases: any;
  static newPhases: any;
  static activities: any;
  stardate2 = new FormControl(new Date(), Validators.required);
  endDate2 = new FormControl('');
    realEndDate2 = new FormControl('');
  realStartDate2 = new FormControl('');

  companyNames: string[] = ['client'];
  startDateui = new Date(2023, 1, 1);
  formValue: any;
  companyName: string | null | undefined = '';
  projectForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    budget: this.builder.control('', Validators.compose([Validators.pattern('^[ \s\.\s\/0-9]*$')])),
    client: this.builder.control('', Validators.required),
    startDate: this.stardate2,
    endDate: this.endDate2,
    realStartDate: this.realStartDate2,
    realEndDate: this.realEndDate2,
    url:this.builder.control(''),
    cost2:this.builder.control(''),
  });
  title: string = 'title';
  project: any;
  protected idx: number = 0;
  private budget: number = 0;

  constructor(
    protected builder: FormBuilder,
    protected service: HttpService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _operations: OperationsService,
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
    this.populateCompanyNames();
    setTimeout(() => {
      this.companyNames = this.operations.removeDuplicates(this.companyNames);
    }, 1000);
  }

  proceedAddProject() {

    if (this.projectForm.valid) {
      this.formValue = this.projectForm.value;
      this.projectForm.reset();
      this.formValue.activeProject = "true";
      let str: string = <string>this.projectForm.value.budget;
      if (this._operations.checkPriceFormat(str)) {
        this.toastr.warning('budget not valid')
      }
      let b: any
      b = this._operations.checkEndDate(this.formValue.startDate, this.formValue.endDate);
      if (!b) {
        this.toastr.warning('End date must be greater than start date');
      } else {
        this.companyName = this.projectForm.value.client;
        delete this.formValue.client;
        this.formValue.endDate = new Date(this.formValue.endDate);
        this.formValue.client = {

          idu: sessionStorage.getItem('idc')
        }
        this.submit();
      }
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  submit() {
    this.formValue.progress = 0;
    this.formValue.alternateId = this._operations.generateAlternateId();
    this.formValue.cost2= this.formValue.cost;
    this.service.add(this.formValue, "project").subscribe(() => {
      this.toastr.success('Project added successfully.');
    });
    // this.formValue.startDate = this.formValue.startDate.toString();
    // this.formValue.startDate = this.formValue.startDate.substring(0, 15)
    //   this.formValue.endDate = this.formValue.startDate.toString();
    // this.formValue.endDate = this.formValue.startDate.substring(0, 15)
    setTimeout(() => {
      this.copyPhases();

    }, 100);
    // this.operations.openDialog(1000, 600, this.formValue, ProjectDetailsComponent)
  }

  populateCompanyNames(): string[] {
    this.service.getAll("user").subscribe(res => {
      NewProjectComponent.user = res;
      if (NewProjectComponent.user) {
        this.companyNames = NewProjectComponent.user
          .filter((u: {
            companyName: null | undefined;
          }) => u.companyName !== null && u.companyName !== undefined) // filter out null or undefined values
          .map((u: { companyName: any; }) => u.companyName);
      }
    });

    return this.companyNames
  }

  onOptionSelected($event: MatSelectChange) {
    let users: any[] = [];
    for (const element of NewProjectComponent.user) {
      users.push(element)
    }
    console.log(users+" " + $event.value);
    this.operations.lookupCompanyName(users, $event.value);
  }

  lookForPhaseId(alternateId: any) {
    let id: any;
    for (const el of NewProjectComponent.newPhases) {
      if (el.alternateId === alternateId) {
              console.log(el.alternateId+" "+alternateId)
        id = el.id;
        return id
      }
    }
  }

  newPhasesHandler() {

  }

  private copyPhases() {
    this.service.getByAlternativeId(this.formValue.alternateId, "project",).subscribe(res => {
      let data: any = res;
      NewProjectComponent.idpn = data.idp;
    });
    setTimeout(() => {
    this.service.getAll( "phase").subscribe(res => {
      NewProjectComponent.allPhases = res
    });
    }, 100);
    setTimeout(() => {
      for (const element of NewProjectComponent.allPhases) {
        if (element.isSubPhase !== "true") {
          if (element.project.alternateId === "default") {
            delete element.project;
            element.project = {
              idp: NewProjectComponent.idpn
            }
            delete element.id;
            this.service.add(element, "phase").subscribe(
              () => {
                // this.toastr.success("phase added")
              }
            );
          }
        }
      }
    }, 200);
      setTimeout(() => {

 this.service.getbyidp(Number(NewProjectComponent.idpn), "phase").subscribe(res => {
      NewProjectComponent.newPhases = res
    });
setTimeout(() => {
 for (const element of NewProjectComponent.allPhases) {

          if (element.isSubPhase === "true") {
              if (element.parent.project.alternateId === "default") {
                let idPhase: any;
                idPhase = this.lookForPhaseId(element.parent.alternateId);
                element.parent = {
                  id: idPhase
                }
                element.project = {
              idp: NewProjectComponent.idpn
            }
                delete element.id;
                this.service.add(element, "phase").subscribe(

              () => {
                // this.toastr.success("subphase added")
              }
                );
              }
          }
        }
},400);

      }, 300);


      setTimeout(() => {
this.newPhasesHandler();
        this.service.getAll("activity").subscribe(res => {
          NewProjectComponent.activities = res
        });
      }, 600);

      setTimeout(() => {
                // console.log("new phases")
        console.log(NewProjectComponent.activities);
          for (const element of NewProjectComponent.activities) {
            if (element.phase.project.alternateId === "default") {
              // console.log(element.phase.alternateId)
            let idPhase: any;
            let phaseId= this.lookForPhaseId(element.phase.alternateId);
              element.phase = {
                id: phaseId
              }
              delete element.alternateId;
              element.alternateId = this._operations.generateAlternateId();
              this.service.add(element, "activity").subscribe(

              () => {
                // this.toastr.success("activities added")
              }
              );
            }
          }

      }, 700);
      setTimeout(() => {
      },850)
    this.service.getbyidp(Number(NewProjectComponent.idpn),"phase").subscribe(res => {
      NewProjectComponent.allNewPhases=res;
    })
    this.service.getAll("activity").subscribe(res => {
NewProjectComponent.newActivities =res;
    })
    setTimeout(() => {
      for (const element of NewProjectComponent.allNewPhases){
delete element.alternateId;
        element.alternateId = this._operations.generateAlternateId();
        this.service.update(element.id,element, "phase")
      }
           for (const element of NewProjectComponent.newActivities){
delete element.alternateId;
        element.alternateId = this._operations.generateAlternateId();
        this.service.update(element.id,element, "activity")
      }
    },100)
  }

  static allNewPhases:any;
  static newActivities:any;
}
