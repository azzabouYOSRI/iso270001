import {Component, OnInit} from '@angular/core';
import {BaseDetailsComponent} from "../../../../utilities/imports/base-details/base-details.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class TaskDetailsComponent extends BaseDetailsComponent implements OnInit {


  override ngOnInit(): void {
    this.endpoint = 'task';
    super.ngOnInit();
    console.log(this.data);
  }


}
