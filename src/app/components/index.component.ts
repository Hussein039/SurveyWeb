import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Survey } from "src/app/models/survey.model";
import { SurveyRepository } from "src/app/models/survey.repository";
import { LocalStorageService } from 'src/app/models/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent {
  title = 'SurveyDIY';
  survey: Survey[] = [];

  constructor(private repository: SurveyRepository,private localStorageService: LocalStorageService,
    private router: Router)
    {repository.getOpenedSurveyList(); }
    
  get openedSurveyList() {
    let surveyList:Survey[] = JSON.parse(this.localStorageService.getItem('surveyList'));
    if (surveyList != null){
        surveyList.forEach((survey,index,list)=>{
            list[index].startDate = moment(survey.startDate).format('YYYY-MM-DD hh:mm:ss A');
            list[index].endDate = moment(survey.endDate).format('YYYY-MM-DD hh:mm:ss A');
        });
      }
        return surveyList;
    // return JSON.parse(this.localStorageService.getItem('openedSurveyList'));
  }

  addRespond(id: string) {
    this.router.navigateByUrl("respond/add/"+id);
}
}


