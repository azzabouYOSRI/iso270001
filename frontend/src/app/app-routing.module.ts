import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {RegisterComponent} from "./component/register/register.component";
import {UserComponent} from "./component/user/user.component";

const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:HomeComponent,path:''},
  {component:RegisterComponent,path:'register'},
  {component:UserComponent,path:'user'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
