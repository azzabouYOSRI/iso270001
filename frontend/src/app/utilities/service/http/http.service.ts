import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../../../interface/Project";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

constructor(private http:HttpClient) {

  }
apiUrl='http://localhost:8080/';
  add(inputdata:any,endPoint:string){
    return this.http.post(this.apiUrl+endPoint+'/save',inputdata)
  }

   getAll(endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl+endpoint+'/all');
  }


  getById(id: any,endPoint:string){
    return this.http.get(this.apiUrl+endPoint+'/findbyid/'+id);
  }

  update(id: any, inputdata:  any,endPoint:string){
    return this.http.patch(this.apiUrl+endPoint+'/update/'+id,inputdata);
  }
  delete(id: string,endPoint:string  ){
    return this.http.delete(this.apiUrl+endPoint+'/delete/'+id);
  }
  getbyidp(id: any, endPoint:string  ): Observable<any>{
    return this.http.get<any>(this.apiUrl+endPoint+'/allbyproject/'+id);
  }

  getidbyidu(idu: string,endPoint:string): Observable<any> {
     return this.http.get<any>(this.apiUrl+endPoint+'/allbyuser/'+idu);
  }

  getByAlternativeId(id:any, endPoint: string) {
        return this.http.get(this.apiUrl+endPoint+'/findbyaltid/'+id);

  }

  getAllByPhaseId(id: string, endpoint: string) {

    return this.http.get(this.apiUrl+endpoint+'/allbyphase/'+id);
  }

  getAllByTaskID(endpoint: string, id: string) {

    return this.http.get(this.apiUrl+endpoint+'/allbytask/'+id);
  }
}
