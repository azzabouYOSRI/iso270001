import {Component, OnInit} from '@angular/core';
import {BaseDeletePopupComponent} from "../../../../../utilities/imports/base-delete-popup/base-delete-popup.component";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent extends BaseDeletePopupComponent implements OnInit {



  private user: any;
    override ngOnInit(): void {
    this.endpoint = 'user';
    super.ngOnInit();
  }

  override loadData(idu: any) {
    this.idx= idu;
    this.service.getById(idu,"user").subscribe(res => {
      this.user = res
      this.message= "Are you sure you want to delete "+this.user.name+" "+this.user.lastname+"?"
      ;});
}
}

