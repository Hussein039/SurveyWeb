import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModelModule } from "src/app/models/model.module";
import { PartialsModule } from "../partials/partials.module";
import { EditComponent } from "./edit.component";


@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule , PartialsModule],
    declarations: [EditComponent],
    exports: [EditComponent]
})

export class UserModule {}