import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../service/http/http.service";
import {Router} from "@angular/router";
import {PreparationsService} from "../../service/preparations/preparations.service";
import {OperationsService} from "../../service/operations/operations.service";

@Component({
  selector: 'app-base-delete-popup',
  templateUrl: './base-delete-popup.component.html',
  styleUrls: ['./base-delete-popup.component.css']
})
export class BaseDeletePopupComponent implements OnInit {



  protected object: any;
  protected idx: any;
  message = 'Default Label';
  constructor(
    protected service: HttpService,
    protected toastr: ToastrService,
    protected dialogref: MatDialogRef<any>,
    protected router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected preparation: PreparationsService,
    protected operation: OperationsService,


  ) {

  }

    ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.loadData(this.data.id,this.data.endpoint);
    }
  }
  endpoint = '';

  proceedDelete() {
        this.fixdepency();
setTimeout(() => {
   this.service.delete(this.idx,this.endpoint).subscribe(() => {
      this.toastr.success('deleted successfully.');
      let toDeletedPm = sessionStorage.getItem('toDeletedPm');
      let deletedPm = "";
        if (toDeletedPm == 'true') {
        sessionStorage.setItem('DeletedPm', 'true')
          deletedPm = 'true';
      } else {
        sessionStorage.setItem('DeletedPm', 'false')
          deletedPm = 'false';
      }
      if (this.endpoint === 'member'&& deletedPm === 'true'){
        sessionStorage.setItem('addedPm', 'false');
      }
      // if (this.endpoint=='members'){
      //   this.router.navigate(['members'])
      // }
      this.dialogref.close();
    });
  }, 250);
  }
fixdepency() {

    }

  loadData(id: any,endpoint:string) {
    this.idx= id;
    this.service.getById(id,this.endpoint).subscribe(res => {
      this.object = res
      this.message= "Are you sure you want to delete "+this.object.name+" ?"
      ;});
}
}

