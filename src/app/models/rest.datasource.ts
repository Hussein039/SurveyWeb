import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { Survey } from "./survey.model";
import { Respond } from "./respond.model";
import { Statistics } from "./statistics.model";
import { ResponseModel } from "./response.model";
import { User } from "./user.model";
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class RestDataSource {

    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient,private localStorageService: LocalStorageService) {
        this.baseUrl = environment.apiURL;
        
    }

    getSurveyList(): Observable<Survey[]> {
        return this.http.get<Survey[]>(this.baseUrl + "survey",this.getOptions());
    }

    getOpenedSurveyList(): Observable<Survey[]> {
        return this.http.get<Survey[]>(this.baseUrl + "survey/open");
    }

    getSurvey(id:string): Observable<Survey> {
        return this.http.get<Survey>(this.baseUrl + "survey/" + id,this.getOptions());
    }

    insertSurvey(item: Survey): Observable<Survey> {
        //console.log(item);
        return this.http.post<Survey>(this.baseUrl + "survey/",
        item, this.getOptions()).pipe(map(response =>{
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
        }))
    };
    updateSurvey(item: Survey): Observable<ResponseModel>{
        return this.http.put<ResponseModel>(`${this.baseUrl}survey/${item._id}`,
        item, this.getOptions()).pipe(map(response =>{
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
        }))
    };

    deleteSurvey(id: string): Observable<ResponseModel> {
        return this.http.delete<ResponseModel>(`${this.baseUrl}survey/${id}`, this.getOptions()).pipe(map(response =>{
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
    }))};

    getUserList(): Observable<User[]>{
        return this.http.get<User[]>(this.baseUrl + "users")
    }
    
    authenticate(username: string, pass: string): Observable<ResponseModel>{
            return this.http.post<any>(this.baseUrl + "users/signin",{
                username: username, password: pass,
            }).pipe(
                map(response =>{
                    this.auth_token = response.success ? response.token : null;
                    this.localStorageService.setItem('username',username);
                    this.localStorageService.setItem('token',this.auth_token);
                    // console.log (this.auth_token);
                    return response;
                }),
                catchError(error => {return of(error.error)})
            );  
    }

    signup(user: User): Observable<ResponseModel>{
        return this.http.post<ResponseModel>(this.baseUrl + 'users', user)
        .pipe(map(response => {
            return response;
        }),
        catchError(error => {return of (error.error)}));
    }

    private getOptions() {
        //console.log('get'+this.localStorageService.getItem('token'));
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.localStorageService.getItem('token')}`
            })
        }
    }
    
    getRespondList(id:string): Observable<Respond[]> {
        return this.http.get<Respond[]>(`${this.baseUrl}response/${id}`, 
        this.getOptions()).pipe(map(response =>{
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
        }));
    }

    insertRespond(item: Respond): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(`${this.baseUrl}response/${item.surveyId}`,
        item)
    }
    
    getRespondStatistics(id:string): Observable<Statistics[]> {
        return this.http.get<Statistics[]>(`${this.baseUrl}response/statistics/${id}`, 
        this.getOptions()).pipe(map(response =>{
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
        }));
    }

    updateUser(user:User): Observable<User>{
        return this.http.put<User>(`${this.baseUrl}users/`,
        user, this.getOptions()).pipe(map(response =>{
            return response;
        }),
        catchError(error => {
            console.log(error.error);
            return of(error.error);
        }))
    };

    getUser(): Observable<User> {
        return this.http.get<User>(this.baseUrl + "users/",this.getOptions());
    }
}
