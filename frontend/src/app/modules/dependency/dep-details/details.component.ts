import {Component, Inject, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseDetailsComponent} from "../../../utilities/imports/base-details/base-details.component";


@Component({
  selector: 'app-phase-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseDetailsComponent implements OnInit {


  override ngOnInit(): void {
    this.endpoint = 'project-dep';
    super.ngOnInit();
  }


}
