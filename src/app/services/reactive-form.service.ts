import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})



export class ReactiveFormService {
  
  ApiUrl: string = environment.apibaseUrll;
  accessTokenData: any = localStorage.getItem("Admin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
 
//  ApiUrl: string = http://localhost:8080/api

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
    
  });

  constructor(private http:HttpClient) { }

  

  getReactiveformdata() {
    return this.http.get<any>(`${this.ApiUrl}/getmyfirstapicall`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

 addReactiveformdata(formData:any) {
  console.log('22222',formData)

    return this.http.post<any>(`${this.ApiUrl}/addreactiveformdata`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }) );

        
  }

  delete(formdata:any) {
    return this.http.post<any>(`${this.ApiUrl}/deleteformdata`, formdata, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }) );

        
  }

  update(formdata:any) {
    return this.http.post<any>(`${this.ApiUrl}/updateformdata`, formdata, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }) );

        
  }


  getuserdetails(id:any) {
    return this.http.get<any>(`${this.ApiUrl}/getuserdetails/${id}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  updateReactiveformdata(formData:any) {

    return this.http.post<any>(`${this.ApiUrl}/updatereactiveformdata`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }) );

        
  }


}
