import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../models/auth.service";

@Component({
    templateUrl: "signin.component.html"
})

export class SigninComponent {
    public title: string = "Sign in";
    public username: string;
    public password: string;
    public message: string;

    constructor(private router: Router,
        private auth: AuthService) {}

    authenticate(form: NgForm){
        if(form.valid)
        {
            this.auth.authenticate(this.username,this.password)
                .subscribe(response =>{
                    if(response.success){
                        this.router.navigateByUrl(this.auth.redirectedUrl || "");
                    }
                    this.message = response.message;
                });
        }else{
            this.message = "Form Data Invalid!";
        }
    }
}