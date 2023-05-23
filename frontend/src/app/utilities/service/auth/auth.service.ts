import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, lastValueFrom, Observable} from "rxjs";
import {UserInterface} from "../../../interface/userInterface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) {

  }
apiUrlAuth='http://localhost:8080/user';


  GetUserbyEmail(email: string | null | undefined):Observable<UserInterface>{
    return this.http.get<UserInterface>(this.apiUrlAuth+'/findbyemail/'+email);
  }

  isloggedin(){
    return sessionStorage.getItem('idu')!=null;
  }
  async resetPassword(userId: number, newPassword: string): Promise<any> {
    try {
      return  firstValueFrom(this.http.patch(this.apiUrlAuth+'/resetpass/'+userId, newPassword));
    } catch (error) {
      console.log(error);
    }
  }


}
