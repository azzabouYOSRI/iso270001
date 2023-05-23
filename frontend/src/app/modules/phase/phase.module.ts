import { NgModule } from '@angular/core';
import {ImportsModule} from "../../utilities/imports/imports.module";
import {PhasesListingComponent} from "./crud/list-phase/phases-listing.component";
import {NewPhaseComponent} from "./crud/new-phase/new-phase.component";
import {PhaseDetailsComponent} from "./crud/phase-details/phase-details.component";
import {DeletePhaseComponent} from "./crud/delete-phase/delete-phase.component";
import {UpdatePhaseComponent} from "./crud/update-phase/phase-update-popup.component";

@NgModule({
  declarations: [
    NewPhaseComponent,
    DeletePhaseComponent,
    PhasesListingComponent,
    PhaseDetailsComponent,
    UpdatePhaseComponent
  ],
  exports: [

  ],
  imports: [
    ImportsModule
  ]
})
export class PhaseModule { }
