import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../../models/model.module";
import { PartialsModule } from "../partials/partials.module";
import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";

@NgModule({
    imports: [ BrowserModule, ModelModule, FormsModule, PartialsModule],
    declarations: [SigninComponent, SignupComponent],
    exports: [SigninComponent, SignupComponent]
})

export class AuthModule {}