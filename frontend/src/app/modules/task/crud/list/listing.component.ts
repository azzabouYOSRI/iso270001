import {Component, OnInit} from '@angular/core';
import {DeleteComponent} from "../delete/delete.component";
import {NewTaskComponent} from "../new/newTask.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {UpdateTaskComponent} from "../update/update.component";
import {TaskDetailsComponent} from "../taskDetails/details.component";

@Component({
  selector: 'app-task-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class TaskListingComponent extends BaseListingComponent implements OnInit{
  override ngOnInit(): void {
    super.ngOnInit();
    this.endpoint = "task";
    this.loadList(this.endpoint);
    this.titleHandler();
    this.preparation.storePhases()
     this.preparation.storeMembersNames()
   }

  override title : string = "title";

  override titleHandler(){

this.id=sessionStorage.getItem("selectedActivity");
      this.title = "Activity "+this.id + " tasks";
  }
   id:any;
  override filter(list:any) : string[] {
    let list2:any = [];
    this.id=sessionStorage.getItem("selectedActivity");
      for (const element of list) {
        if (element.activity.id == this.id && element.validated !== "true") {
            list2.push(element)
          }
      }
  return list2
}

  override displayedColumns: string[] = ['id', 'name','order','details','validate','reject','update','delete'];



  c :any = NewTaskComponent;
  d:any = DeleteComponent;
  u:any = UpdateTaskComponent;
  Taskdetail:any = TaskDetailsComponent;
  static taskslength:any;
  static activities:any;
  static phases:any;
  static progress1 = 0;
static progress2 = 0;
static progress3 = 0;
  static cost1 = 0;
static cost2 = 0;
static cost3 = 0;

  validate(element:any) {

    this.service.update(element.id,{validated: true},"task").subscribe(() => {
      this.toastr.success("task validated");
      this.loadList(this.endpoint);
    });
 this.service.getAll("task").subscribe((data) => {
   TaskListingComponent.taskslength = data.length;
 });
 let length: number =  Number(TaskListingComponent.taskslength);
 let value = {
    childDones: Number(element.activity.childDones) + 1,
    progress: (Number((element.activity.childDones) )+ 1) / length * 100
 }
 setTimeout(() => {
 let value = {
    childDones: Number(element.activity.childDones) + 1,
    progress: ((Number(element.activity.childDones) )+ 1) / Number(TaskListingComponent.taskslength) * 100
 }
 this.service.update(element.activity.id,value,"activity").subscribe(() => {
  });
  }, 100);
  setTimeout(() => {

 this.service.getAll("activity").subscribe((data) => {
    TaskListingComponent.activities = data;
     for (const activity of TaskListingComponent.activities) {
  TaskListingComponent.cost1= activity.cost + TaskListingComponent.cost1;
   TaskListingComponent.progress1 = Number(activity.progress)/Number(TaskListingComponent.activities.length) + TaskListingComponent.progress1;
   // console.log(TaskListingComponent.progress1);
 }
 });
  }, 150);

  setTimeout(() => {
    // console.log(TaskListingComponent.progress1);
  this.service.update(element.activity.phase.id,{progress:TaskListingComponent.progress1},"phase").subscribe(() => {
    });
 }, 200);

  if (element.activity.phase.subphase == "true") {
setTimeout(() => {
  this.service.getAll("phase").subscribe((data) => {
    TaskListingComponent.phases = data;
     for (const phase of TaskListingComponent.phases) {
       if (phase.parentPhase.id == element.activity.phase.parentPhase.id){
                TaskListingComponent.cost2= Number(phase.cost) + TaskListingComponent.cost2;
               TaskListingComponent.progress2 = Number(phase.progress)/Number(TaskListingComponent.phases.length) + TaskListingComponent.progress2;
       }
    }
  });
 }, 225);
  setTimeout(() => {
    // console.log(TaskListingComponent.progress1);
  this.service.update(element.activity.phase.parentPhase.id,{progress:TaskListingComponent.progress2,cost:TaskListingComponent.cost2},"phase").subscribe(() => {
    });
 }, 250);
  setTimeout(() => {
for (const phase of TaskListingComponent.phases) {
       if (phase.subphase=="false"){
         TaskListingComponent.cost3= Number(phase.cost) + TaskListingComponent.cost3;
               TaskListingComponent.progress3 = Number(phase.progress)/Number(TaskListingComponent.phases.length) + TaskListingComponent.progress3;
       } }
 }, 275);

  setTimeout(() => {
    // console.log(element.activity.phase);
    this.service.update(element.activity.phase.parentPhase.project.idp,{progress:Number(TaskListingComponent.progress3),cost:TaskListingComponent.cost3},"project").subscribe(() => {
    });
 }, 300);
  }
  else {
setTimeout(() => {
  this.service.getAll("phase").subscribe((data) => {
    TaskListingComponent.phases = data;
     for (const phase of TaskListingComponent.phases) {
       if (phase.subphase=="false"){
          TaskListingComponent.cost3= Number(phase.cost) + TaskListingComponent.cost3;
               TaskListingComponent.progress3 = Number(phase.progress)/Number(TaskListingComponent.phases.length) + TaskListingComponent.progress3;
    }
    }
  });
 }, 225);

  setTimeout(() => {
    // console.log(element.activity.phase);
    this.service.update(element.activity.phase.project.idp,{progress:Number(TaskListingComponent.progress3),cost:TaskListingComponent.cost3},"project").subscribe(() => {
    });
 }, 300);
  }



}
static subtasksLength:number;
  reject(element:any) {
    let added = false;
    this.service.getAll("subtask").subscribe((data:any) => {
         TaskListingComponent.subtasksLength = data.length;

for (const element of data) {
        if (element.task.id == element.id) {
          this.service.update(element.id,{done:false},"subtask").subscribe(() => {
            added = true;
          });
        }
      }
    });
    this.service.update(element.id,{progress:0,childDones:0},"task").subscribe(() => {
      this.toastr.success("Task rejcted");
      this.loadList(this.endpoint);
    });
  }
}



