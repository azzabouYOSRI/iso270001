import { NgModule } from '@angular/core';
import {RegisterComponent} from "./user-crud/register/register.component";
import {ConfirmationComponent} from "./user-crud/delete-popup/confirmation/confirmation.component";
import {ResetPasswordComponent} from "./user-crud/reset-password/reset-password.component";
import {UpdatePopupComponent} from "./user-crud/update-popup/update-popup.component";
import {UserListingComponent} from "./user-crud/user-listing/user-listing.component";
import {ImportsModule} from "../../utilities/imports/imports.module";
import {ProfileComponent} from "./profile/profile.component";
import {InserteduserComponent} from "./user-crud/register/inserteduser/inserteduser.component";
import {password} from "./profile/change-password/password.component";


@NgModule({
  declarations: [
    RegisterComponent,
    ConfirmationComponent,
    ResetPasswordComponent,
    UpdatePopupComponent,
    UserListingComponent,
    ProfileComponent,
    InserteduserComponent,
    password
  ],
  imports: [
    ImportsModule
  ]
})
export class UsersModule { }
