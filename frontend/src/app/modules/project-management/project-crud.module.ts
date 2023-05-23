import { NgModule } from '@angular/core';
import {ImportsModule} from "../../utilities/imports/imports.module";
import {NewProjectComponent} from "./project-crud/new-project/new-project.component";
import {ProjectListingComponent} from "./project-crud/project-listing/project-listing.component";
import {ProjectUpdatePopupComponent} from "./project-crud/project-update-popup/project-update-popup.component";
import {ProjectDeletePopupComponent} from "./project-crud/project-delete-popup/project-delete-popup.component";
import {FormsModule} from "@angular/forms";
import {ProjectDetailsComponent} from "./project-details/project-details.component";

@NgModule({
    declarations: [
        NewProjectComponent,
        ProjectListingComponent,
        ProjectUpdatePopupComponent,
        ProjectDeletePopupComponent,
        ProjectDetailsComponent
    ],
    exports: [
        NewProjectComponent
    ],
    imports: [
        ImportsModule,
        FormsModule
    ]
})
export class ProjectCrudModule { }
