import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../main/app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {BaseListingComponent} from "./base-listing/base-listing.component";
import {BaseDeletePopupComponent} from "./base-delete-popup/base-delete-popup.component";
import {BaseDetailsComponent} from "./base-details/base-details.component";



@NgModule({
  declarations: [
    BaseListingComponent,
  BaseDeletePopupComponent,
    BaseDetailsComponent,
  ],
  imports: [
    CommonModule,
       BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatDatepickerModule
  ],
    exports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule,
    MatIconModule,
    MatDatepickerModule
  ]
})
export class ImportsModule {


}
