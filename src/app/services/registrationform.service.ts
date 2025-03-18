import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegistrationformService {
  ApiUrl: string = environment.apibaseUrll;
   headers = new HttpHeaders({
    'Content-Type':  'application/json',
      });


 constructor(private http:HttpClient) { }
 addregisterformdata(formData:any) {
  return this.http.post<any>(`${this.ApiUrl}/addregisterationformdata`, formData, { headers: this.headers })
      .pipe(map((response: any) => {
          return response;
      }) );
}
loginformdata(formData:any) {
  console.log('6666',formData)
  return this.http.post<any>(`${this.ApiUrl}/loginformdata`, formData, { headers: this.headers })
  .pipe(map(user => {
    if (user && user.token) {
        localStorage.setItem('Admin', JSON.stringify(user));
       console.log("54321",user);
       console.log("abc",user.token);
    }

    return user;
}));

}
public get getAuthenticatedUser() {
  let accessTokenData: any = localStorage.getItem("Admin");
  let accessTokenObj: any = JSON.parse(accessTokenData);
    if(accessTokenObj) {
      return accessTokenObj;
    }
}
}
