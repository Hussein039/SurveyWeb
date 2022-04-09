import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Respond } from "src/app/models/respond.model";
import { RespondRepository } from "src/app/models/respond.repository";
import { LocalStorageService } from 'src/app/models/local-storage.service';

@Component({
    selector: "list",
    templateUrl: "list.component.html"
})

export class RespondListComponent {
    title = 'Respond List';
    surveyid: string ='';
    respondList: Respond[] = null;

    constructor(private repository: RespondRepository,
        private router: Router,
        activeRoute: ActivatedRoute,
        private localStorageService: LocalStorageService
    ){ 
        this.localStorageService.removeItem('respondList');
        this.surveyid = activeRoute.snapshot.params['id'];
        this.getRespondList();
    }

    // get survey(): Survey {
    //     let survey:Survey;
    //     let surveyList:Survey[] = JSON.parse(this.localStorageService.getItem('surveyList'));
    //     survey = surveyList.find(survey =>survey._id === this.surveyid);
    //     console.log(survey);
    //     return survey;
    // }
    
    async getRespondList() {
        this.repository.getRespondList(this.surveyid);
        await new Promise(r => setTimeout(r, 300));
        console.log(JSON.parse(this.localStorageService.getItem('respondList')));
        this.respondList = JSON.parse(this.localStorageService.getItem('respondList'));
        // return this.repository.getRespondList(this.surveyid);
    }

    createRange(number: number){
        return new Array(number);
    }

    get noResponse():boolean {
        if (this.respondList == null || this.respondList.length==0)
            return true;
        else return false;

    }
}
