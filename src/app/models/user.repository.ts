import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { RestDataSource } from "./rest.datasource";
import { LocalStorageService } from './local-storage.service';
import { ResponseModel } from "./response.model";

@Injectable()
export class UserRepository {


    constructor(private dataSource: RestDataSource,private localStorageService: LocalStorageService) {
    }

    getUser() {
        this.dataSource.getUser()
        .subscribe(response => {
            if(response){
                this.localStorageService.setItem('user',JSON.stringify(response));
            }
            else{
                let error = response as ResponseModel;
                alert(`Error: ${error.message}`);
                
            }
        });

        
    }

    async saveUser(user: User){
        // if(this.localStorageService.getItem('username') == null || this.localStorageService.getItem('username') == ""){
        //     this.dataSource.signup(user)
        //     .subscribe(response => {
        //         if(response.success)
        //         {
        //             return response.message;
        //         }
        //         else{
        //             let error = response as ResponseModel;
        //             alert(`Error: ${error.message}`);
                    
        //         }
        //     });
        // }else{
            this.dataSource.updateUser(user).subscribe(response => {
                if (response) {
                    this.localStorageService.setItem('username',user.username);
                }
            });
        // }
    }
    

}