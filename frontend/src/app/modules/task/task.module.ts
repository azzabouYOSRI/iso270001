import { NgModule } from '@angular/core';
import {ImportsModule} from "../../utilities/imports/imports.module";
import { TaskListingComponent} from "./crud/list/listing.component";
import { NewTaskComponent} from "./crud/new/newTask.component";
import {TaskDetailsComponent} from "./crud/taskDetails/details.component";
import {DeleteComponent} from "./crud/delete/delete.component";
import { UpdateTaskComponent} from "./crud/update/update.component";
import {SubTaskDetailsComponent} from "./crud/subTaskDetails/details.component";
import {UpdateComponent} from "./todo/update/update.component";
import {TodoListingComponent} from "./todo/list-tasks/listing.component";
import {TodoListing2Component} from "./todo/list-subtasks/listing.component";

@NgModule({
  declarations: [
    NewTaskComponent,
    DeleteComponent,
    TaskListingComponent,
    TaskDetailsComponent,
    UpdateTaskComponent,
    SubTaskDetailsComponent,
    TodoListingComponent,
    TodoListing2Component,
    UpdateComponent
  ],
  exports: [

  ],
  imports: [
    ImportsModule
  ]
})
export class TaskModule { }
