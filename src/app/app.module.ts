import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from './components/auth/auth.module';
import { SigninComponent } from './components/auth/signin.component';
import { SignupComponent } from './components/auth/signup.component';

import { AppComponent } from './app.component';

import {IndexComponent} from './components/index.component';
import { IndexModule } from './components/index.module';

import { SurveyModule } from './components/survey/survey.module';
import { UserModule } from './components/user/user.module';
import { ListComponent } from './components/survey/list.component';
import { AddEditComponent } from './components/survey/add_edit.component';
import { EditComponent } from './components/user/edit.component';
import { AuthGuard } from "./components/auth/auth.guard";
//import { AddEditComponent } from './components/survey/add_edit.component';

import { RespondModule } from './components/respond/respond.module';
import { RespondListComponent } from './components/respond/list.component';
import { RespondAddComponent } from './components/respond/add.component';
import { RespondStatisticsComponent } from './components/respond/statistics.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IndexModule,
    SurveyModule,
    AuthModule,
    RespondModule,
    UserModule,
    RouterModule.forRoot([
      {path: "", component: IndexComponent },
      {path: "survey/list", component: ListComponent , canActivate: [AuthGuard]},
      {path: "survey/:mode", component: AddEditComponent, canActivate: [AuthGuard] },
      {path: "survey/:mode/:id", component: AddEditComponent, canActivate: [AuthGuard] },
      {path: "respond/list/:id", component: RespondListComponent, canActivate: [AuthGuard] },
      {path: "respond/add/:id", component: RespondAddComponent },
      {path: "respond/statistics/:id", component: RespondStatisticsComponent, canActivate: [AuthGuard] },
      {path: "users/signin", component:SigninComponent },
      {path: "users/signup", component:SignupComponent },
      {path: "users/edit", component:EditComponent , canActivate: [AuthGuard]},
      {path: "**", redirectTo: "" }
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
