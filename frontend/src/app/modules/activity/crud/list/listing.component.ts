import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DeleteComponent} from "../delete/delete.component";
import {NewComponent} from "../new/new.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {DetailsComponent} from "../details/details.component";
import {UpdateComponent} from "../update/update.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-activity-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ActivityListingComponent extends BaseListingComponent implements OnInit,AfterViewInit{
    ngAfterViewInit(): void {
          this.preparation.storePhases()
    }

  override ngOnInit(): void {
      super.ngOnInit();
    this.endpoint = "activity";
    this.loadList(this.endpoint);
    this.titleHandler();
    this.preparation.storePhases()
    this.allowModificationHandler()
   }

  override title : string = "title";

  override titleHandler(){

this.id=sessionStorage.getItem("selectedPhase");
      this.title = "phase "+this.id + " activities";
  }
   id:any;
  override filter(list:any) : string[] {
    let list2:any = [];
    this.id=sessionStorage.getItem("selectedPhase");
      for (const element of list) {
        if (element.phase.id == this.id) {
            list2.push(element)
          }
      }
  return list2
}

  override displayedColumns: string[] = [ 'name','order','details','tasks','update','delete'];



  c :any = NewComponent;
  d:any = DeleteComponent;
  u:any = UpdateComponent;
  detail:any = DetailsComponent;
  allowModification: boolean = false;

   override loadList(endpoint:string) {
    let list:any;
    let id:any  = sessionStorage.getItem("selectedPhase");
    this.service.getAllByPhaseId(id,endpoint).subscribe(data => {
      list = data;
      list = this.filter(list)
      list= this.operations.replaceNullsWithDash(list)
      this.dataSource = new MatTableDataSource (list);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
  }

  allowModificationHandler(){
     if(this.isPM || sessionStorage.getItem("type")=="admin"){
       this.allowModification = true;
     }
  }

}

