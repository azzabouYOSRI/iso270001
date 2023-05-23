import { NgModule } from '@angular/core';
import {ImportsModule} from "../../utilities/imports/imports.module";
import {ActivityListingComponent} from "./crud/list/listing.component";
import {NewComponent} from "./crud/new/new.component";
import {DetailsComponent} from "./crud/details/details.component";
import {DeleteComponent} from "./crud/delete/delete.component";
import {UpdateComponent} from "./crud/update/update.component";

@NgModule({
  declarations: [
    NewComponent,
    DeleteComponent,
    ActivityListingComponent,
    DetailsComponent,
    UpdateComponent
  ],
  exports: [

  ],
  imports: [
    ImportsModule
  ]
})
export class ActivityModule { }
