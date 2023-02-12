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
  // private apiUrlAuth=environment.apiUrl+'/user';
apiUrlAuth='http://localhost:8080/user';
  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrlAuth+'/all');
  }
  RegisterUser(inputdata:any){
    return this.http.post(this.apiUrlAuth+'/save',inputdata)
  }

  GetUserbyEmail(email: String | null | undefined):Observable<User>{
    return this.http.get<User>(this.apiUrlAuth+'/findbyemail/'+email);
  }

  GetUserbyId(id:number):Observable<User>{
    return this.http.get<User>(this.apiUrlAuth+'/find/'+id);
  }
  updateuser(id:number,inputdata:JSON){
    return this.http.put(this.apiUrlAuth+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('userid')!=null;
  }
  getrole(){
    return sessionStorage.getItem('type')!=null?sessionStorage.getItem('type')?.toString():'';
  }
}
