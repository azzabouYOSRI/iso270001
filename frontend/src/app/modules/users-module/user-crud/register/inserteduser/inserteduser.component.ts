import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-inserteduser',
  templateUrl: './inserteduser.component.html',
  styleUrls: ['./inserteduser.component.css']
})
export class InserteduserComponent {
  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }



}
