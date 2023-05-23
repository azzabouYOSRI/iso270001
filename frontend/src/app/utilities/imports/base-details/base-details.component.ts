import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../service/http/http.service";
import {OperationsService} from "../../service/operations/operations.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-base-details',
  templateUrl: './base-details.component.html',
  styleUrls: ['./base-details.component.css']
})
export class BaseDetailsComponent implements OnInit {
  get object(): any {
    return this._object;
  }
  private idx: number = 0;
  private _object: any;

  constructor(
    protected iconRegistry: MatIconRegistry,
    protected sanitizer: DomSanitizer,
     protected dialogref: MatDialogRef<any>,
    protected  service: HttpService,
    protected operations: OperationsService,
    protected toastr: ToastrService,
    protected services: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.iconRegistry.addSvgIcon('arrow-back', this.sanitizer.bypassSecurityTrustResourceUrl('assets/arrow-back.svg'));
  }


  message: string="`Default Label`";
  endpoint: string="";
  titleHandler() {
    switch (this.endpoint) {
      case 'user':     this.message = "User "+ this.data.id + " details"; break;
      case 'project':  this.message = "Project "+ this.data.id + " details"; break;
      case 'task':     this.message = "Task "+ this.data.id + " details"; break;
      case 'phase':     this.message = "Phase "+ this.data.id + " details"; break;
      case 'activiy':     this.message = "Activiy "+ this.data.id + " details"; break;
      case 'subtask':     this.message = "SubTask "+ this.data.id + " details"; break;
    }
  }
  Data:any;


  ngOnInit(): void {
   this.Data = this.data;
   this.Data= this.operations.replaceNullsWithDash(this.Data);
   this.titleHandler();
       this.Data.startDate = new Date(this.Data.startDate);
  }



}
