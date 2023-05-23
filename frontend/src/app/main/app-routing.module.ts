import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "../component/general/login/login.component";
import {HomeComponent} from "../component/general/home/home.component";
import {RegisterComponent} from "../modules/users-module/user-crud/register/register.component";
import {AuthGuard} from "../utilities/guard/auth.guard";
import {UserListingComponent} from "../modules/users-module/user-crud/user-listing/user-listing.component";
import {ProfileComponent} from "../modules/users-module/profile/profile.component";
import {NewProjectComponent} from "../modules/project-management/project-crud/new-project/new-project.component";
import {
  ProjectListingComponent
} from "../modules/project-management/project-crud/project-listing/project-listing.component";
import {
  ProjectDepListingComponent
} from "../modules/dependency/Dependencies-crud/project-dep-listing/project-dep-listing.component";
import {
  NewProjectDepComponent
} from "../modules/dependency/Dependencies-crud/new-project-Dep/new-project-dep.component";
import {ProjectDetailsComponent} from "../modules/project-management/project-details/project-details.component";
import {MembersListingComponent} from "../modules/member/members-crud/Member-listing/Member-listing.component";
import {PhasesListingComponent} from "../modules/phase/crud/list-phase/phases-listing.component";
import {ActivityListingComponent} from "../modules/activity/crud/list/listing.component";
import {TaskListingComponent} from "../modules/task/crud/list/listing.component";
import {NewTaskComponent} from "../modules/task/crud/new/newTask.component";
import {UpdateTaskComponent} from "../modules/task/crud/update/update.component";
import {TodoListingComponent} from "../modules/task/todo/list-tasks/listing.component";

const routes: Routes = [
  {component: LoginComponent, path: 'login'},
  {component: HomeComponent, path: '', canActivate: [AuthGuard]},
  {component: RegisterComponent, path: 'register', canActivate: [AuthGuard]},
  {component: UserListingComponent, path: 'users', canActivate: [AuthGuard]},
  {component: ProfileComponent, path: 'profile', canActivate: [AuthGuard]},
  {component: NewProjectComponent, path: 'new-project', canActivate: [AuthGuard]},
  {component: ProjectListingComponent, path: 'projects', canActivate: [AuthGuard]},
  {component: ProjectDepListingComponent, path: 'project-deps', canActivate: [AuthGuard]},
  {component: NewProjectDepComponent, path: 'new-project-dep', canActivate: [AuthGuard]},
  {component: ProjectDetailsComponent, path: 'project-detail', canActivate: [AuthGuard]},
  {component: MembersListingComponent, path: 'members', canActivate: [AuthGuard]},
  {component: PhasesListingComponent, path: 'phases', canActivate: [AuthGuard]},
  {component: ActivityListingComponent, path: 'activity', canActivate: [AuthGuard]},
    {component: TaskListingComponent, path: 'tasks', canActivate: [AuthGuard]},
  {component: NewTaskComponent, path: 'new-task',canActivate: [AuthGuard]},
    {component: UpdateTaskComponent, path: 'update-task', canActivate: [AuthGuard]},
      {component:   TodoListingComponent, path: 'todo', canActivate: [AuthGuard]},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
