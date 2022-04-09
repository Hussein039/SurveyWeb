import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { SurveyRepository } from "./survey.repository";
import { RespondRepository } from "./respond.repository";
import { UserRepository } from "./user.repository";
import { RestDataSource } from "./rest.datasource";
import { AuthService } from "./auth.service";
import { LocalStorageService } from './local-storage.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        SurveyRepository,
        RespondRepository,
        UserRepository,
        RestDataSource,
        AuthService,
        LocalStorageService    
    ]
})

export class ModelModule { }
