import { Injectable } from "@angular/core";
import { Respond } from "./respond.model";
import { Statistics } from "./statistics.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";
import { LocalStorageService } from './local-storage.service';

@Injectable() 
export class RespondRepository {
    private respondList: Respond[] = [];
    private statisticsList: Statistics[] = [];

    constructor(private dataSource: RestDataSource,private localStorageService: LocalStorageService) {
        
    }
    
    getRespondList(id: string) : Respond[] {
        this.dataSource.getRespondList(id).subscribe(data => {
            this.respondList = data;
            console.log("respondList"+this.respondList);
            this.localStorageService.setItem('respondList',JSON.stringify(data));
        }
        );
        return this.respondList;
    }

    getRespondStatistics(id:string): Statistics[] {
        this.dataSource.getRespondStatistics(id).subscribe(data => {
            this.statisticsList = data;
            console.log("respondStat"+this.respondList);
            this.localStorageService.setItem('respondStat',JSON.stringify(data));
        }
        );
        return this.statisticsList;
    }

    async saveRespond(item: Respond){
        this.dataSource.insertRespond(item)
        .subscribe(response => {
            if(response.success)
            {
                alert("Thank you for your participation!");
            }
            else{
                let error = response as ResponseModel;
                alert(`Error: ${error.message}`);
            }
        });
    }
}