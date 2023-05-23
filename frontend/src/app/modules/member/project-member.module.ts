import { NgModule } from '@angular/core';
import {ImportsModule} from "../../utilities/imports/imports.module";
import {NewMemberComponent} from "./members-crud/new-member/new-member.component";
import {MemberDeleteComponent} from "./members-crud/Member-delete/Member-delete.component";
import {MembersListingComponent} from "./members-crud/Member-listing/Member-listing.component";
import {ProjectDependencyModule} from "../dependency/project-dependency.module";

@NgModule({
  declarations: [
    NewMemberComponent,
    MembersListingComponent,
    MemberDeleteComponent],
  exports: [
  ],
  imports: [
    ImportsModule,
    ProjectDependencyModule
  ]
})
export class ProjectMemberModule { }
