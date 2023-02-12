import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) {

  }
  apiurl='http://localhost:8080/user';

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.apiurl);
  }
  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }

  GetUserbyEmail(email: String | null | undefined):Observable<User>{
    return this.http.get<User>(this.apiurl+'/findbyemail/'+email);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
