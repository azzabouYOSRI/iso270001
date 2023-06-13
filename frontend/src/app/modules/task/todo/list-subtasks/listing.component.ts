import {Component, OnInit} from '@angular/core';
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {SubTaskDetailsComponent} from "../../crud/subTaskDetails/details.component";
import {TaskDetailsComponent} from "../../crud/taskDetails/details.component";
import {UpdateComponent} from "../update/update.component";
import {MatTableDataSource} from "@angular/material/table";
// import {UpdateTodoComponent} from "../update/update.component";
// import {TaskDetailsComponent} from "../taskDetails/details.component";

@Component({
  selector: 'app-task-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class TodoListing2Component extends BaseListingComponent implements OnInit{
   isComplete: boolean= false;
  override ngOnInit(): void {
    this.endpoint = "subtask";
    this.loadList(this.endpoint);
    this.toastr.info("Subtasks that are marked as done will be removed from the list");
   }
   id:any;

   override filter(list:any) : string[] {
     let list2:any = [];
     for (const element of list) {
       if (element.done == "false") {
           list2.push(element);
         }
     }
     return list2
   }
  override displayedColumns: string[] = [ 'name','order','description','done','mark done','update'];
   UpdateComponent = UpdateComponent;
  static subtasks: any;
  static task: any[];
  markSubtaskDone(element:any) {
    let formvalue = {
      done: true
    }
    this.service.update(element.id,formvalue,"subtask").subscribe(() => {
      this.toastr.success("Subtask marked as done");
      this.loadList(this.endpoint);

    });
 this.service.getAll("subtask").subscribe((data) => {
   TodoListing2Component.subtasks = data.length;
 });
 let value = {
    childDones: Number(element.task.childDones) + 1,
    progress: Number(((element.task.childDones) + 1)/Number(TodoListing2Component.subtasks)) * 100
 }
 setTimeout(() => {
 this.service.update(element.task.id,value,"task").subscribe(() => {
   this.loadList(this.endpoint);
  });
  }, 100);
}

  showCompletedTasks() {
    let list2: any = [];
    for (const element of this.dataTable) {
      if (element.done == true) {
        list2.push(element);
      }
    }
      this.dataSource = new MatTableDataSource (list2);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.isComplete = true;
  }

  back() {
  this.isComplete = false;
    this.loadList(this.endpoint);
  }
}

