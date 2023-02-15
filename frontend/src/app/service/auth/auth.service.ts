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

  GetUserbyId(id: any):Observable<User>{
    return this.http.get<User>(this.apiUrlAuth+'/findbyid/'+id);
  }

  updateuser(id: any, inputdata:  any){
    return this.http.put(this.apiUrlAuth+'/update/'+id,inputdata);
  }
  isloggedin(){
    return sessionStorage.getItem('userid')!=null;
  }
}
