import { NgModule } from '@angular/core';
import {ImportsModule} from "../../utilities/imports/imports.module";
import {
  NewProjectDepComponent
} from "./Dependencies-crud/new-project-Dep/new-project-dep.component";
import {
  ProjectDepListingComponent
} from "./Dependencies-crud/project-dep-listing/project-dep-listing.component";
import {
  ProjectDepUpdatePopupComponent
} from "./Dependencies-crud/project-dep-update-popup/project-dep-update-popup.component";
import {
  ProjectDepDeletePopupComponent
} from "./Dependencies-crud/project-dep-delete-popup/project-dep-delete-popup.component";
import {DetailsComponent} from "./dep-details/details.component";

@NgModule({
  declarations: [
    NewProjectDepComponent,
    ProjectDepListingComponent,
    ProjectDepUpdatePopupComponent,
    ProjectDepDeletePopupComponent,
  DetailsComponent],
  exports: [
    NewProjectDepComponent,
    ProjectDepUpdatePopupComponent
  ],
  imports: [
    ImportsModule
  ]
})
export class ProjectDependencyModule { }
