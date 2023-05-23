import {Component, OnInit} from '@angular/core';
import {BaseDetailsComponent} from "../../../../utilities/imports/base-details/base-details.component";

@Component({
  selector: 'app-actity-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseDetailsComponent implements OnInit {


  override ngOnInit(): void {
    this.endpoint = 'activity';
    super.ngOnInit();
    console.log(this.data);
  }


}
