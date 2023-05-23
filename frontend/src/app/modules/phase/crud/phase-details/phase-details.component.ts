import {Component, Inject, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {NewPhaseComponent} from "../new-phase/new-phase.component";
import {BaseDetailsComponent} from "../../../../utilities/imports/base-details/base-details.component";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";

@Component({
  selector: 'app-phase-details',
  templateUrl: './phase-details.component.html',
  styleUrls: ['./phase-details.component.css']
})
export class PhaseDetailsComponent extends BaseDetailsComponent implements OnInit {


  override ngOnInit(): void {
    this.endpoint = 'Project';
    super.ngOnInit();
    console.log(this.data);
  }


}
