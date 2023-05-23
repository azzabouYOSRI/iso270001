import {Component, OnInit} from '@angular/core';
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {SubTaskDetailsComponent} from "../../crud/subTaskDetails/details.component";
import {TaskDetailsComponent} from "../../crud/taskDetails/details.component";
import {TodoListing2Component} from "../list-subtasks/listing.component";
// import {UpdateTodoComponent} from "../update/update.component";
// import {TaskDetailsComponent} from "../taskDetails/details.component";

@Component({
  selector: 'app-task-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class TodoListingComponent extends BaseListingComponent implements OnInit{
  override ngOnInit(): void {
    this.endpoint = "task";
    this.loadList(this.endpoint);
   }
   id:any;
  override filter(list:any) : string[] {
    let list2:any = [];
    this.id=sessionStorage.getItem("idu");
      for (const element of list) {
        // console.log(element)
        if (element.member.user.idu == this.id && element.progress != "100") {
            list2.push(element);
          }
      }
  return list2
}

 openDialog2(enterAnimation: any, exitAnimation: any, object: any, component: any) {
    this.dialog.open(component, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      width: '35%',
      data: {
        id: object
      }
    });
  }
  static tasks:any = [];
  static subtasksLength:any = [];
  marktaskDone(id:Number) {
    let added = false;
    this.service.getAll("subtask").subscribe((data:any) => {
         TodoListingComponent.subtasksLength = data.length;

for (const element of data) {
        if (element.task.id == id) {
          this.service.update(element.id,{done:true},"subtask").subscribe(() => {
            added = true;
          });
        }
      }
    });
    let n = Number(TodoListingComponent.subtasksLength)
    this.service.update(id,{progress:100,childDones:n},"task").subscribe(() => {
      this.toastr.success("Task marked as done");
      this.loadList(this.endpoint);
    });
  }

  override displayedColumns: string[] = [ 'name','order','details','mark done','open'];

  taskdetail:any = TaskDetailsComponent;
  protected readonly TodoListing2Component = TodoListing2Component;
}

