import { Component } from "@angular/core";
import { Router , ActivatedRoute } from "@angular/router";
import { Survey } from "src/app/models/survey.model";
import { SurveyRepository } from "src/app/models/survey.repository";
import { LocalStorageService } from 'src/app/models/local-storage.service';
import * as moment from 'moment';

@Component({
    selector: "list-survey",
    templateUrl: "list.component.html"
})

export class ListComponent {
    title = 'Survey List';

    constructor(private repository: SurveyRepository,
        private router: Router,private localStorageService: LocalStorageService)
        { 
            this.localStorageService.removeItem('surveyList');
            this.repository.getSurveyList(); 
        }
    
    get surveyList(): Survey[] {
        let surveyList:Survey[] = JSON.parse(this.localStorageService.getItem('surveyList'));
        if (surveyList!=null)
        {
            surveyList.forEach((survey,index,list)=>{
                list[index].startDate = moment(survey.startDate).format('YYYY-MM-DD hh:mm:ss A');
                list[index].endDate = moment(survey.endDate).format('YYYY-MM-DD hh:mm:ss A');
            });
        }   
        return surveyList;
        // return JSON.parse(this.localStorageService.getItem('surveyList'));
    }

    deleteMethod(id: string) {
        if(confirm("Are you sure you want to delete?")) {
            this.router.navigateByUrl("survey/delete/"+id);
        }
    }

    viewRespond(id: string) {
        this.router.navigateByUrl("respond/list/"+id);
    }

    addRespond(id: string) {
        this.router.navigateByUrl("respond/add/"+id);
    }

    viewStatistics(id: string) {
        this.router.navigateByUrl("respond/statistics/"+id);
    }
}