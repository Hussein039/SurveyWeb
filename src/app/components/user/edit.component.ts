import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../models/user.model";
import { UserRepository } from "../../models/user.repository";
import { LocalStorageService } from '../../models/local-storage.service';

@Component({
    selector: "edit",
    templateUrl: "edit.component.html"
})

export class EditComponent{

    title: string="Edit User";
    user: User = new User;
    public confirmPassword: string;
    public message: string;

    constructor(private repository: UserRepository,
                private router: Router,
                activerouter: ActivatedRoute,
                private localStorageService: LocalStorageService)
    {
        this.getUser( repository);
    }


    async getUser( repository: UserRepository){
        repository.getUser();
        await new Promise(r => setTimeout(r, 500));
        this.user = JSON.parse(this.localStorageService.getItem('user'));
    }
    

    save(form: NgForm){
        if(form.valid)
        {
            if(this.confirmPassword == form.value.password){
                this.user.password = form.value.password;
                //console.log(JSON.stringify(this.user));
                this.repository.saveUser(this.user);
                this.router.navigateByUrl("/");
            }
            else{
                alert("The Passwords do not match");
            }
        }
        else{
            alert("Please input password");
        }
    }

}