import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../../../utilities/service/auth/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get shownButon(): boolean {
    return this._shownButon;
  }
  private password: any;
  private idx: any;
  private _message = "msg";
  private _shownButon: boolean = true;
  constructor(
    private service: HttpService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private operation: OperationsService,
  ) {

  }
plaintext: any;
  saltedpassword : any;
static hashedPassword: any;
    ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.loadUserData(this.data.id);
      this.idx= this.data.id;
      this.plaintext= this.operation.generatePassword()
      // this.plaintext= "string"
      let salt = this.operation.genSalt()
        let hashedPasswordPromise = this.operation.hashPassword(this.plaintext, salt);
        console.log(salt );
      this.getPromiseAsString(hashedPasswordPromise).then((result: any) => {
  ResetPasswordComponent.hashedPassword= result
        console.log(ResetPasswordComponent.hashedPassword);
});
      setTimeout(() => {
              this.saltedpassword = salt.substring(0,8) + ResetPasswordComponent.hashedPassword+salt.substring(8,16)
    }, 100);
    }
  }
 resetPassword() {
      setTimeout(() => {
    this.service.update(this.idx,{password:this.saltedpassword},"user").subscribe(res => {
     this.message = "Password reset successfully. New password is: " + this.plaintext;
     this._shownButon=false;
     this.msg="ok";
   });
  }, 200);
    }
    getPromiseAsString(promise:any) {
  return promise.then((result: { toString: () => any; }) => {
    return result.toString();
  });
}

user:any;
  msg: any="no";
loadUserData(idu: any) {
    this.idx= idu;
    this.service.getById(idu,"user").subscribe(res => {
      this.user=res;
        this.message= "Are you sure you want to reset password for  "+this.user.name+" "+this.user.lastname+"?"

})
}
}
