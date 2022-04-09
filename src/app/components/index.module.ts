import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent } from './index.component';
import { FormsModule } from '@angular/forms';
import { PartialsModule } from './partials/partials.module';
import { ModelModule } from "src/app/models/model.module";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    RouterModule , 
    ModelModule, 
    BrowserModule,
    FormsModule,
    PartialsModule
  ],
  exports: [IndexComponent]
})

export class IndexModule { }
