import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";
import { ResponseModel } from "./response.model";
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {

    public username: string;
    private _redirectUrl: string;

    constructor(private datasource: RestDataSource,private localStorageService: LocalStorageService){}

    authenticate(username: string, password: string): Observable<ResponseModel>{
        return this.datasource.authenticate(username, password)
        .pipe(map(response =>{
            if(response.success)
            {
                this.username = this.localStorageService.getItem('username');
            }
            return response;
        }));
    }

    signup(user: User): Observable<ResponseModel>{
        return this.datasource.signup(user);
    }

    get authenticated(): boolean {
        return this.localStorageService.getItem('token') != null;    
    }

    clear() {
        this.username = null;
        this.datasource.auth_token = null;
    }

    get redirectedUrl(): string{
        let result = this._redirectUrl;
        this._redirectUrl = null;
        return result;
    }

    set redirectedUrl(url: string){
        this._redirectUrl = url;
    }
   
}