import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from '../component/general/home/home.component';
import { LoginComponent } from '../component/general/login/login.component';
import { NavBarComponent } from '../utilities/nav-bar/nav-bar.component';
import {ImportsModule} from "../utilities/imports/imports.module";
import {ProjectCrudModule} from "../modules/project-management/project-crud.module";
import {UsersModule} from "../modules/users-module/users.module";
import {ProjectDependencyModule} from "../modules/dependency/project-dependency.module";
import {ProjectMemberModule} from "../modules/member/project-member.module";
import {PhaseModule} from "../modules/phase/phase.module";
import {ActivityModule} from "../modules/activity/activity.module";
import {TaskModule} from "../modules/task/task.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
  ],
    imports: [
        UsersModule,
        ImportsModule,
        ProjectCrudModule,
        ProjectDependencyModule,
        ProjectMemberModule,
        PhaseModule,
        ActivityModule,
        TaskModule,
        MatProgressBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
