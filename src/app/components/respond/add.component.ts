import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Respond, Responses } from "src/app/models/respond.model";
import { RespondRepository } from "src/app/models/respond.repository";
import { Survey } from "src/app/models/survey.model";
import { SurveyRepository } from "src/app/models/survey.repository";
import { LocalStorageService } from 'src/app/models/local-storage.service';

@Component({
    selector: "add",
    templateUrl: "add.component.html"
})

export class RespondAddComponent {
    title: string = 'Add a new Respond';
    editing: boolean = false;
    respond: Respond = new Respond();
    // surveyname: string = '';
    optionvalue: string = '';
    surveyid: string = '';
    
    constructor(private repository: RespondRepository,
        private surveyrepository: SurveyRepository,
        private router: Router,
        activeRoute: ActivatedRoute,
        private localStorageService: LocalStorageService
    ) {
        this.surveyid = activeRoute.snapshot.params['id'];
        this.respond.surveyId = this.surveyid;
        this.respond.username = this.localStorageService.getItem('username');
        // this.surveyrepository.getSurvey(this.surveyid);
    }

    get survey(): Survey {
        let survey:Survey;
        let surveyList:Survey[] = JSON.parse(this.localStorageService.getItem('surveyList'));
        survey = surveyList.find(survey =>survey._id === this.surveyid);
        // console.log(survey);
        return survey;
    }
    // get survey(): Survey {
    //     return this.surveyrepository.getSurvey(this.surveyid);
    // }
        
    // ngOnInit(): void {
    //     this.respond.surveyId = this.survey._id;
    //     this.respond.username = User.name;
    // }

    onSubmit(form: NgForm) {
        const value = form.value;
        let response = {};
        let responses : Respond[] = [];
        for (let i=1; i<=5 ;i++){
            if (form.value["questionText_"+i] !== undefined){
                response = {
                    questionId: form.value["questionId_"+i],
                    questionText: form.value["questionText_"+i],
                    answer: form.value["questionOption_"+i]
                };
                responses.push(response);
            }

        }
        this.respond = {
            surveyId: value.surveyId,
            username: value.username,
            responses: responses
        }
        // console.log(JSON.stringify(this.respond));
        this.repository.saveRespond(this.respond);
        this.router.navigateByUrl("/");                
    }

    createRange(number: number){
        return new Array(number);
    }
}