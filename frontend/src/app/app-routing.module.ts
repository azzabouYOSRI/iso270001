import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {RegisterComponent} from "./component/register/register.component";
import {UserComponent} from "./component/user/user.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:HomeComponent,path:'',canActivate:[AuthGuard]},
  {component:RegisterComponent,path:'register',canActivate:[AuthGuard]},
  {component:UserComponent,path:'user',canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
