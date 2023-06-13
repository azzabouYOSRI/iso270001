import {Component, OnInit} from '@angular/core';
import {DeleteComponent} from "../delete/delete.component";
import {NewTaskComponent} from "../new/newTask.component";
import {BaseListingComponent} from "../../../../utilities/imports/base-listing/base-listing.component";
import {UpdateTaskComponent} from "../update/update.component";
import {TaskDetailsComponent} from "../taskDetails/details.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-task-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class TaskListingComponent extends BaseListingComponent implements OnInit {
  static taskslength: any;
  static activities: any;
  static phases: any;
  static progress1 :number = 0;
  static progress2 :number = 0;
  static progress3 :number = 0;
  static cost1:number = 0;
  static cost2 :number = 0;
  static cost3 :number = 0;
    static costdep :number = 0;
  static subtasksLength: number;
  override title: string = "title";
  id: any;
  override displayedColumns: string[] = ['id', 'name', 'order', 'details', 'validate', 'reject', 'update', 'delete'];
  c: any = NewTaskComponent;
  d: any = DeleteComponent;
  u: any = UpdateTaskComponent;
  Taskdetail: any = TaskDetailsComponent;
  private static name2: any;
  isComplete: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.endpoint = "task";
    this.loadList(this.endpoint);
    this.titleHandler();
    this.preparation.storePhases()
    this.preparation.storeMembersNames()
  }

  override titleHandler() {

    this.service.getById(sessionStorage.getItem("selectedActivity"), "activity").subscribe(item => {
          let data: any;
          data = item;
          TaskListingComponent.name2 = data.name;
        });
    setTimeout(() => {
        this.title = "Activity " + TaskListingComponent.name2 + " tasks";
      }, 100);

  }

  override filter(list: any): string[] {
    let list2: any = [];
    this.id = sessionStorage.getItem("selectedActivity");
    for (const element of list) {
      if (element.activity.id == this.id && element.validated !== "true") {
        list2.push(element)
      }
    }
    return list2
  }

  validate(element: any) {
    this.service.update(element.id, {validated: true}, "task").subscribe(() => {
      this.toastr.success("task validated");
      this.loadList(this.endpoint);
    });

    this.service.getAll("task").subscribe((data) => {
      TaskListingComponent.taskslength = data.length;
    });
    setTimeout(() => {
      let length: number = Number(TaskListingComponent.taskslength);
      let childDones: number = Number(element.activity.childDones);
      // console.log(childDones);
      let progress: number = (Number((element.activity.childDones)) + 1) / length * 100
      let value = {
        childDones: Number(element.activity.childDones) + 1,
        progress: (Number((element.activity.childDones)) + 1) / length * 100,
        cost: Number(element.activity.cost) + Number(element.cost)
      }
      this.service.update(element.activity.id, value, "activity").subscribe(() => {
      });
    }, 100);
    setTimeout(() => {

      this.service.getAll("activity").subscribe((data) => {
        TaskListingComponent.activities = data;
        for (const activity of TaskListingComponent.activities) {
          TaskListingComponent.cost1 = Number(activity.cost) + Number(TaskListingComponent.cost1);
          TaskListingComponent.progress1 = Number(activity.progress) / Number(TaskListingComponent.activities.length) + TaskListingComponent.progress1;
          // console.log(TaskListingComponent.cost1);
        }
      });
    }, 200);

    setTimeout(() => {
      // console.log(TaskListingComponent.progress1);
      this.service.update(element.activity.phase.id, {progress: TaskListingComponent.progress1,cost: TaskListingComponent.cost1}, "phase").subscribe(() => {
      });
    }, 300);

    if (element.activity.phase.isSubPhase == "true") {
    //
      let filterdPhases: any = [];
      setTimeout(() => {
        this.service.getAll("phase").subscribe((data) => {

          //           ----------------
          //
          for (const phase of data) {
            if (phase.project.idp == element.activity.phase.project.idp &&phase.isSubPhase == "true" ) {
              filterdPhases.push(phase)
            }
          }
          TaskListingComponent.phases = filterdPhases;
          //
          //             -------------------
    //
          for (const phase of TaskListingComponent.phases) {
            if (phase.id == element.activity.phase.id && phase.isSubPhase == "true") {
              TaskListingComponent.cost2 = Number(phase.cost) + TaskListingComponent.cost2;
              TaskListingComponent.progress2 = Number(phase.progress) / Number(TaskListingComponent.phases.length) + TaskListingComponent.progress2;
            }
          }
        });
      }, 400);
      setTimeout(() => {
        // console.log(TaskListingComponent.progress1);
        this.service.update(element.activity.phase.parent.id, {
          progress: TaskListingComponent.progress2,
          cost: TaskListingComponent.cost2
        }, "phase").subscribe(() => {
        });
      }, 500);


      setTimeout(() => {

         this.service.getAll("phase").subscribe((data) => {

           //           ----------------
           //
           for (const phase of data) {
             if (phase.project.idp == element.activity.phase.project.idp) {
               filterdPhases.push(phase)
             }
           }
         });
           TaskListingComponent.phases = filterdPhases;

           for (const phase of TaskListingComponent.phases) {
             if (phase.parent.project.idp == element.activity.phase.project.idp && phase.subphase == "false") {
               TaskListingComponent.cost3 = Number(phase.cost) + TaskListingComponent.cost3;
               TaskListingComponent.progress3 = Number(phase.progress) / Number(TaskListingComponent.phases.length) + TaskListingComponent.progress3;
             }
           }
             this.service.getbyidp(element.activity.phase.project.idp,"project-dep").subscribe((data)=>{
         for (const element of data) {
           TaskListingComponent.costdep=Number(element.cost)+Number(TaskListingComponent.costdep);
         }
       });

           }, 600);

      setTimeout(() => {
        // console.log(element.activity.phase);
        // console.log('here')
        TaskListingComponent.cost2=TaskListingComponent.cost3+TaskListingComponent.costdep;
        this.service.update(element.activity.phase.project.idp,
          {progress: Number(TaskListingComponent.progress3)}
        , "project").subscribe(() => {
        });
        this.service.update(element.activity.phase.project.idp,
          {cost2: Number(TaskListingComponent.cost3)}
        , "project").subscribe(() => {
        });
      }, 700);
    }

    else {
      setTimeout(() => {
        let cost2 = 0;
        let filterdPhases: any = [];
        this.service.getAll("phase").subscribe((data) => {
          for (const phase of data) {
            if (phase.project.idp == element.activity.phase.project.idp && phase.isSubPhase == "false") {
              filterdPhases.push(phase)
            }
            TaskListingComponent.phases = filterdPhases;
            // console.log(TaskListingComponent.phases);
          }
                        let st=''
          for (const phase of TaskListingComponent.phases) {
            if (phase.isSubPhase == "false") {
              console.log(phase);
              // console.log(TaskListingComponent.cost2)
              TaskListingComponent.cost2 = Number(phase.cost) + TaskListingComponent.cost2;
              // st="+"+TaskListingComponent.cost2.toString();
              console.log( TaskListingComponent.cost2);
              // console.log(TaskListingComponent.cost2);
              TaskListingComponent.progress2 = Number(phase.progress) / Number(TaskListingComponent.phases.length) + TaskListingComponent.progress2;
            }
          }
        });
       this.service.getbyidp(element.activity.phase.project.idp,"project-dep").subscribe((data)=>{
         for (const element of data) {
           TaskListingComponent.costdep=Number(element.cost)+Number(TaskListingComponent.costdep);
         }
       });
                    // console.log(TaskListingComponent.progress2);
                    // console.log(TaskListingComponent.cost2);
      }, 400);

      setTimeout(() => {
        // console.log(element.activity.phase);
        // console.log(TaskListingComponent.progress3);
        // console.log(project);
        TaskListingComponent.cost2=TaskListingComponent.cost2+TaskListingComponent.costdep;
        this.service.update(element.activity.phase.project.idp,
          {progress: Number(TaskListingComponent.progress2)}
        , "project").subscribe(() => {
        });
        this.service.update(element.activity.phase.project.idp,
          {cost2: Number(TaskListingComponent.cost2)}
        , "project").subscribe(() => {
        });

      }, 600);
    }
  }

  reject(element: any) {
    let added = false;
    this.service.getAll("subtask").subscribe((data: any) => {
      TaskListingComponent.subtasksLength = data.length;

      for (const element of data) {
        if (element.task.id == element.id) {
          this.service.update(element.id, {done: false}, "subtask").subscribe(() => {
            added = true;
          });
        }
      }
    });
    this.service.update(element.id, {progress: 0, childDones: 0}, "task").subscribe(() => {
      this.toastr.success("Task rejcted");
      this.loadList(this.endpoint);
    });
  }

  showCompletedTasks() {
    let filterdTasks: any = [];
    for (const element of this.dataTable) {
      if (element.validated && element.progress == 100) {
        filterdTasks.push(element);
      }
    }
    this.dataSource = new MatTableDataSource (filterdTasks);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.isComplete = true;
  }

  back() {
    this.isComplete = false;
    this.loadList(this.endpoint);
  }
}



