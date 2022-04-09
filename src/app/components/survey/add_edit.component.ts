import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Survey } from "src/app/models/survey.model";
import { SurveyRepository } from "src/app/models/survey.repository";
import * as moment from 'moment';


@Component({
    selector: "add-edit",
    templateUrl: "add_edit.component.html"
})



export class AddEditComponent {
    
    title:string = 'Add a new Survey';
    editing: boolean = false;
    item: Survey = new Survey();
    fakeArray = new Array(5);
    readonly: boolean = false;

    constructor(private repository: SurveyRepository,
                private router: Router,
                activeRoute: ActivatedRoute) 
    { 
        // Delete
        if (activeRoute.snapshot.params["mode"] == "delete") {
            this.deleteItem(activeRoute.snapshot.params["id"]);
        }

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        
        // Edit
        if (this.editing) {
            
            this.item= this.repository.getSurvey(activeRoute.snapshot.params["id"]);
            //console.log("item"+JSON.stringify(this.item));
            this.item.startDate =  moment(this.item.startDate).format('YYYY-MM-DDThh:mm:ss');
            this.item.endDate =  moment(this.item.endDate).format('YYYY-MM-DDThh:mm:ss');


            //console.log("item1!"+this.item);
        } 

        // Add      
    }

    save(form: NgForm) {
        
        let questionId: number[] = [];
        let questionText: string[] = [];
        let questionOptionText: string[] = [];
        for (let i=1; i<=5 ;i++){
            if (form.value["questionText_"+i] !== ''){
                questionId.push(i);
                questionText.push(form.value["questionText_"+i]);
                questionOptionText.push(form.value["questionOptionText_"+i]);
            }

        }
        this.item.questionId = questionId;
        this.item.questionText = questionText;
        this.item.questionOptionText = questionOptionText;
        this.item.publish = form.value.publish;
        this.item.startDate = form.value.startDate;
        this.item.endDate = form.value.endDate;
        console.log("save survey!!"+JSON.stringify(this.item));
        this.repository.saveSurvey(this.item);
        this.router.navigateByUrl("survey/list");                
    }

    private deleteItem(id: string){
        console.log('delete survey!!!');
        this.repository.deleteSurvey(id);
        this.router.navigateByUrl("survey/list");
    }

    toggleReadOnly(input:string) {
        //console.log(input);
        if (input == 'TF')
            this.readonly = true;
        else this.readonly = false;
    }
    
}
