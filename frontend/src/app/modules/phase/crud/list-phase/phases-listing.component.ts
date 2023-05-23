import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DeletePhaseComponent} from "../delete-phase/delete-phase.component";
import {NewPhaseComponent} from "../new-phase/new-phase.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {PhaseDetailsComponent} from "../phase-details/phase-details.component";
import {UpdatePhaseComponent} from "../update-phase/phase-update-popup.component";

@Component({
  selector: 'app-phase-listing',
  templateUrl: './phases-listing.component.html',
  styleUrls: ['./phases-listing.component.css']
})
export class PhasesListingComponent extends BaseListingComponent implements OnInit,AfterViewInit{
    ngAfterViewInit(): void {
          this.preparation.storePhases()
    }

 backButton:boolean=false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.endpoint = "phase";
    this.loadList(this.endpoint);
    this.titleHandler();
   }

  override title : string = "title";

   static  name2: string = "";
  override titleHandler(){
    this.subPhaseFilter = sessionStorage.getItem("subPhaseFilter");

    if (this.subPhaseFilter == "true" ) {
      this.id=sessionStorage.getItem("selectedPhase");
        this.title = "phase " + this.id + " sub phases";
    }
    else {
      if (sessionStorage.getItem("default") == "true") {
        this.title = "Default phases"
      } else {
        this.service.getById(sessionStorage.getItem("selectedProject"), "project").subscribe(item => {
          let data: any;
          data = item;
          PhasesListingComponent.name2 = data.name;
        });
        this.title = "project " + PhasesListingComponent.name2 + " phases";
      }
    }
  }
   id:any;
  idp:any;
  subPhaseFilter:any;

  override filter(list:any) : string[] {

      this.titleHandler();
    let list2:any = [];
    this.subPhaseFilter = sessionStorage.getItem("subPhaseFilter");
    this.idp=sessionStorage.getItem("selectedProject");
    this.id=sessionStorage.getItem("selectedPhase");
if (this.subPhaseFilter == "true" ) {
this.displayedColumns= [ 'name','order','details','activities','update','delete'];
      for (const element of list) {
        if (element.project.idp.toString() == this.idp.toString() && element.isSubPhase == "true") {
          if (element.parent.id == this.id) {
            list2.push(element)
            }
          }
      }
}
else {
  this.displayedColumns=[ 'name','order','progress','details','SubPhases','activities','update','delete'];
      for (const element of list) {
        if (element.project.idp.toString() == this.idp.toString() && element.isSubPhase == "false") {
          list2.push(element);
        }

      }
}


  return list2
}

filterSubPhase(id:number){
    this.backButton=true;
  sessionStorage.setItem("subPhaseFilter","true");
  sessionStorage.setItem("selectedPhase",id.toString());
  this.loadList(this.endpoint);
}



  c :any = NewPhaseComponent;
  d:any = DeletePhaseComponent;
  u:any = UpdatePhaseComponent;
  detail:any = PhaseDetailsComponent;
  allowModification: boolean = false;

  allowModificationHandler(){

  }

  resetSubFilter() {
    this.backButton=false;
    sessionStorage.setItem("subPhaseFilter","false");
    this.loadList(this.endpoint);
  }
}

