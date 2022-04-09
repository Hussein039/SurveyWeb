import { Injectable } from "@angular/core";
import { Survey } from "./survey.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";
import { LocalStorageService } from './local-storage.service';

@Injectable() 
export class SurveyRepository {
    private surveyList: Survey[] = [];
    private openedSurveyList: Survey[] = [];
    private survey:Survey = null;

    constructor(private dataSource: RestDataSource,private localStorageService: LocalStorageService) {
    }
    

getSurveyList() : Survey[] {
    this.dataSource.getSurveyList().subscribe(data => {
        this.surveyList = data;
        this.localStorageService.setItem('surveyList',JSON.stringify(data));
        
        //console.log("construct surveyList"+this.surveyList);
    });
    return this.surveyList;
}

getSurvey(id: string): Survey {
    //console.log(id);
    //console.log("surveyList"+this.localStorageService.getItem('surveyList'));
    this.surveyList = JSON.parse(this.localStorageService.getItem('surveyList'));
    console.log("Survey!:"+(this.surveyList.find(item =>item._id === id)));
    this.survey = this.surveyList.find(item =>item._id === id);
    
    return (this.survey);
}

getSurveyFromDB(id: string): Survey {
    this.dataSource.getSurvey(id).subscribe(data => {
        this.survey = data;
        this.localStorageService.setItem('survey',JSON.stringify(data));
        
        //console.log("construct surveyList"+this.surveyList);
    });
    return this.survey;
}

getOpenedSurveyList() : Survey[] {
    this.dataSource.getOpenedSurveyList().subscribe(data => {
        this.openedSurveyList = data;
        this.localStorageService.setItem('surveyList',JSON.stringify(data));
        
        // console.log("construct openedSurveyList"+JSON.stringify(data));
    });
    return this.openedSurveyList;
}

async saveSurvey(item: Survey){
    if(item._id == null || item._id == ""){
        this.dataSource.insertSurvey(item)
        .subscribe(response => {
            if(response)
            {
                this.surveyList.push(response);
            }
            else{
                let error = response as ResponseModel;
                alert(`Error: ${error.message}`);
                
            }
        });
    }else{
        this.dataSource.updateSurvey(item).subscribe(response => {
            if (response.success) {
                this.surveyList.splice(this.surveyList.
                    findIndex(i => i._id == item._id), 1, item);
            }
        });
    }
}

deleteSurvey(id: string){
    this.dataSource.deleteSurvey(id).subscribe(response => {
        if (response.success) {
            this.surveyList.splice(this.surveyList.
                findIndex(item => item._id == id), 1);
        } else{
            alert(response.message);
        }
    })
}
}