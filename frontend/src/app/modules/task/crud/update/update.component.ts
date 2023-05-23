import {Component, ViewChild} from '@angular/core';
import { NewTaskComponent} from "../new/newTask.component";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-task-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateTaskComponent extends NewTaskComponent {
   subPhasesNames2: string[] = [];
      subPhasesParent: string[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  static dataList: any;
  override taskSubmit() {

   this.service.update(this.idx,this.formValue,"task").subscribe(() => {
        this.toastr.success('task updated Successfully');
          setTimeout(() => {
            this.taskAdded=true;
      }, 500);
          });
  }

  loadData(id: any) {
    let data :any;
    this.service.getById(id,"task").subscribe(res => {
      data = res
        this.TaskForm.patchValue({
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        realStartDate: data.realStartDate,
        realEndDate: data.realEndDate,
        posistion: data.posistion,
      });
    });

}

title:string='';

  titleHandler() {
    this.idx = sessionStorage.getItem('selectedTask');
    this.title = 'Update task  '+this.idx;
}

  override loadListSubTask(endpoint:string) {
    let list:any;
    let id:any = sessionStorage.getItem("selectedTask");
    let subTasksIds:any =[];
    this.service.getAllByTaskID(endpoint,id).subscribe(data => {
      UpdateTaskComponent.dataList = data;
      list= this.operations.replaceNullsWithDash(UpdateTaskComponent.dataList)
      let id=1;
      for (const element of list) {
        subTasksIds.push(element.id.toString());
        element.id = id;
        id++;
        if (id>1){
          this.lengthOnInitlizationStatus='true'
        }
      }
      this.subTasks = list;
      sessionStorage.setItem("subTasksIds",JSON.stringify(subTasksIds));
      this.dataSource = new MatTableDataSource (this.subTasks);
      this.dataSource.sort = this.sort;
    })
  }

  override ngOnInit() {
    super.ngOnInit();
      this.titleHandler() ;
      this.loadData(this.idx);
      this.loadListSubTask("subtask");
      this.operation2='update';
    console.log(this.operation);
  }
  }
