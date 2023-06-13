import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {MatDialog} from "@angular/material/dialog";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";
import {SubTaskDetailsComponent} from "../subTaskDetails/details.component";
import {TaskDetailsComponent} from "../taskDetails/details.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-task-activity',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewTaskComponent implements OnInit {
  user: any;
  date: any = new Date();
  stardate2 = new FormControl(this.date, Validators.required);
  endDate2 = new FormControl('');
  realEndDate2 = new FormControl('');
  realStarDate2 = new FormControl('');
  startDateui = new Date(2023, 1, 1);

  formValue: any;
  TaskForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    posistion: this.builder.control(0),
    startDate: this.stardate2,
    endDate: this.endDate2,
    cost: this.builder.control(0),
    url: this.builder.control(''),
    realStartDate: this.realStarDate2,
    realEndDate: this.realEndDate2,
    activity: this.builder.control(''),
    member: this.builder.control('', Validators.required),
  });
  subTaskForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    posistion: this.builder.control(''),
    done: this.builder.control(''),
    task: this.builder.control(''),
    url: this.builder.control('')
  });

  idx: any;
  subTaskformValue: any;
  alternateId: any;
  cancel: boolean = false;
  dataSource: any;
  selectedSubTaskId: any;
  subTasks: any = [];
  displayedColumns: string[] = ['id', 'name', 'order', 'done', 'details', 'update', 'delete'];
  subTaskDetail: any = SubTaskDetailsComponent;
  dynamicButtonName: string = 'add';
  operation: string = 'add'
  operation2: string = 'add'
  taskAdded: boolean = false;
  subTaskAdded: boolean = false;
  subTaskId: number = 1;
  taskSubmitButtonStatus: boolean = false;
  saveTaskButtonStatus: boolean = false;
  saveSubTaskButtonStatus: boolean = false;
  update: boolean = false;
  isThereSubTask: boolean = false;
  noSubtask: boolean = false;
  membersId: any = []
  membersName: any = []
allowAddNewSubatsks = true;
  constructor(
    protected builder: FormBuilder,
    protected service: HttpService,
    protected router: Router,
    protected toastr: ToastrService,
    protected dialog: MatDialog,
    protected preparation: PreparationsService,
    protected operations: OperationsService
  ) {
  }

  ngOnInit(): void {
    this.membersId = this.operations.getArray('membersIds');
    this.membersName = this.operations.getArray('membersNames');
    this.preparation.storeMembersNames()
    this.preparation.storePhases()

  }

  taskformControl() {
    if (this.TaskForm.valid) {
      this.formValue = this.TaskForm.value;
      let b: any;
      let startDate:any;
      let endDate:any;
      let realStartDate:any;
      let realEndDate:any;
      if (this.formValue.startDate !== null && this.formValue.startDate !== '') {
         startDate = new Date(this.formValue.startDate);
      }
      if (this.formValue.endDate !== null && this.formValue.endDate !== '') {
         endDate = new Date(this.formValue.endDate);
      }
      if (this.formValue.realStartDate !== null && this.formValue.realStartDate !== '') {
         realStartDate = new Date(this.formValue.realStartDate);
      }
      if (this.formValue.realEndDate !== null && this.formValue.realEndDate !== '') {
         realEndDate = new Date(this.formValue.realEndDate);
      }

      if (startDate > endDate) {
        this.toastr.warning('start date must be before end date');
        return;
      }
      if (startDate  > realEndDate) {
        this.toastr.warning('real start date must be after  start date');
        return;
      }
       if (endDate  > realEndDate) {
        this.toastr.warning('real end date must be after  end date');
        return;
      }
      if (realStartDate > realEndDate) {
        this.toastr.warning('real start date must be before real end date');
        return;
      }
      this.taskDataHandler();
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  addSubTaskToTable(subTaskformValue: any) {
    subTaskformValue.id = this.subTaskId++;
    this.subTasks.push(subTaskformValue);
    this.dataSource = new MatTableDataSource(this.subTasks);
    this.subTaskForm.reset();
    this.isThereSubTask = true;
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource(this.subTasks);
  }

  taskDataHandler() {
    let id: any;
    id = sessionStorage.getItem('selectedActivity');
    this.formValue.activity = {
      "id": id
    };
    this.taskSubmit();
  }

  updatePatch(id: any) {
    this.dynamicButtonName = 'Update';
    this.cancel = true;
    let subTask2: any;
    this.selectedSubTaskId = id;
    for (const subTask of this.subTasks) {
      if (subTask.id === id) {
        subTask2 = subTask
      }
    }
    this.subTaskForm.patchValue({
      name: subTask2.name,
      description: subTask2.description,
      posistion: subTask2.posistion,
      done: subTask2.done,
    });
    this.operation = 'update';
  }

  updateSubTaskToTable(subTaskformValue: any) {
    let list: any = [];
    for (const subTask of this.subTasks) {
      if (subTask.id !== this.selectedSubTaskId) {
        list.push(subTask);
      }
    }
    subTaskformValue.id = this.selectedSubTaskId;
    list.push(subTaskformValue);
    this.subTasks = list;
    this.dataSource = new MatTableDataSource(this.subTasks);
    this.refreshTable();
  }

  noSubtaskHandler() {
    if (!this.update && !this.isThereSubTask) {
      this.noSubtask = true;
    }
  }

  taskSubmit() {
      if(this.formValue.cost==null||this.formValue.cost=="")
    {
      this.formValue.cost=0;
    }
    this.alternateId = this.operations.generateAlternateId();
    this.formValue.alternateId = this.alternateId;
    this.formValue.progress = 0;
    this.formValue.activity = {
      "id": sessionStorage.getItem('selectedActivity')
    }
    this.formValue.member = {
      "id": sessionStorage.getItem('selectedMember')
    }
    this.formValue.childDones = 0;
    this.service.add(this.formValue, "task").subscribe(() => {
      this.taskAdded = true;
      this.noSubtask=true;
      this.allowAddNewSubatsks = true;
      this.toastr.success('Task added successfully');
    });
  }

  delete(id: any) {
    let list: any = [];
    for (const subTask of this.subTasks) {
      if (subTask.id !== id) {
        list.push(subTask);
      }
    }
    this.subTasks = list;
    this.refreshTable();
    if (this.subTasks.length === 0) {
      this.isThereSubTask = false;
    }
  }
static insertedTask: any;
  insertedTask() {

    this.service.getByAlternativeId(this.alternateId, "task").subscribe((data: any) => {
     NewTaskComponent.insertedTask = data
    });
  }

  taskWithoutSubTaskSubmit() {
    if (this.taskAdded) {
      this.insertedTask();
      delete this.formValue.endDate;
      delete this.formValue.startDate;
      delete this.formValue.realEndDate;
      delete this.formValue.realStartDate;
      delete this.formValue.progress;
      delete this.formValue.alternateId;
      delete this.formValue.activity;
      setTimeout(() => {
      this.formValue.task = {
        "id": NewTaskComponent.insertedTask.id
      }

      this.formValue.done = 'false';
      console.log(this.formValue);
        // setTimeout(() => {
      this.service.add(this.formValue, "subtask").subscribe(() => {
        this.toastr.info('Default added');
        this.allowAddNewSubatsks = false;
        this.noSubtask = false;
      });
            // }, 100);

      this.subTasks = [];
      this.refreshTable();
      this.isThereSubTask = false;
      this.subTaskForm.reset();
      this.TaskForm.reset();
      this.noSubtask = false;
            }, 100);
    } else {
      this.toastr.warning('Please add task first');
    }
  }

  lengthOnInitlizationStatus: any;
  cleanSubTaskTable() {
    let subTasksIds: any = [];
    if (this.lengthOnInitlizationStatus == 'true') {
    subTasksIds=this.operations.getArray('subTasksIds');
    let a =sessionStorage.getItem('subTasksIds');
    // console.log(a);
    console.log(subTasksIds);
      for (const subTask of subTasksIds) {
        this.service.delete(subTask, "subtask").subscribe(() => {
        });
      }
    }
  }
  subTaskSubmit() {
    if (this.taskAdded || this.operation2 == 'update') {
      if (this.operation2 !== 'update') {
        this.insertedTask();
      }
      if (this.operation2=='update'){
      this.cleanSubTaskTable();
      }
      setTimeout(() => {
        for (const subTask of this.subTasks) {
          subTask.progress = 0;
          subTask.task = {
            "id": NewTaskComponent.insertedTask.id
          }
          subTask.done = 'false';
          delete subTask.id;
        }
        for (const subTask of this.subTasks) {
          this.service.add(subTask, "subtask").subscribe(() => {
          });
          this.subTaskAdded = true;
        }
        if (this.subTaskAdded) {
          this.toastr.success('subTask Added Successfully');
          if (this.operation2 !== 'update') {
                      this.subTasks = [];

          }
          this.refreshTable();
          this.isThereSubTask = false;
          this.subTaskForm.reset();
          if (this.operation2 !== 'update') {
          this.TaskForm.reset();}
          this.subTaskAdded = false;
        }
      }, 100);

    } else {
      this.toastr.error('Task not added');
    }
  }


  subTaskJunctionSumbit() {
    if (this.subTaskForm.valid) {
      let subTaskformValue = this.subTaskForm.value;

      if (this.operation == 'add') {
        this.addSubTaskToTable(subTaskformValue);
      } else if (this.operation == 'update') {
        this.updateSubTaskToTable(subTaskformValue);
        this.operation = 'add';
        this.cancel = false;
      }
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  openDialogCaller(element: any, component: any) {
    this.operations.openDialog(1000, 600, element, component);
  }

  updateToAdd() {
    this.cancel = false;
    this.dynamicButtonName = 'add';
    this.operation = 'add';
  }

  onOptionSelected($event: MatSelectChange) {
    this.operations.searchIdByName($event.value, this.membersName, this.membersId, 'Member');
  }

   loadListSubTask(endpoint:string) {
  }
}
