import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../models/auth.service";
import { User } from "../../models/user.model";

@Component({
    templateUrl: "signup.component.html"
})

export class SignupComponent{
    public user: User = new User();
    public confirmPassword: string;
    public message: string;
    public title: string = "Sign Up";

    constructor(private router: Router,
        private auth: AuthService) {}

    signup(form: NgForm){
        if(form.valid)
        {
            if(this.confirmPassword == this.user.password){
                this.auth.signup(this.user)
                .subscribe(response =>{
                    //console.log(response);
                    if(response.success){
                        alert(response.message);
                        this.router.navigateByUrl("/users/signin")
                    }
                    this.message = response.message;
                });
            }
            else{
                this.message = "The Passwords do not match";
            }
        }
        else{
            this.message = "Form Data Invalid";
        }
    }
}