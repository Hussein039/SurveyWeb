import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModelModule } from "src/app/models/model.module";
import { PartialsModule } from "../partials/partials.module";
import { RespondListComponent } from "./list.component";
import { RespondAddComponent } from "./add.component";
import { RespondStatisticsComponent } from "./statistics.component";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule , PartialsModule],
    declarations: [RespondListComponent, RespondAddComponent, RespondStatisticsComponent],
    exports: [RespondListComponent, RespondAddComponent, RespondStatisticsComponent]
})

export class RespondModule {}