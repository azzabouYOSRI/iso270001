import {FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileComponent} from "../profile.component";
import {Component, Inject, OnInit} from "@angular/core";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";


@Component({
  selector: 'app-password',
  templateUrl: './password.html',
  styleUrls: ['./password.component.css']
})
export class password implements OnInit {


  static user: any;
  static hashedPassword: any;
  pass: boolean = false;
  Form = this.builder.group({
    oldPassword: this.builder.control('', [Validators.required]),
    newPassword: this.builder.control('', [Validators.required]),
    confirmPassword: this.builder.control('', [Validators.required]),
  });

  constructor(
    private builder: FormBuilder,
    private service: HttpService,
    private toastr: ToastrService,
    private dialogref: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private operations: OperationsService,
  ) {
  }

  proceedSave() {
    if (this.Form.valid) {
      if (this.Form.value.newPassword != this.Form.value.confirmPassword) {
        this.toastr.error('Password and confirm password fields do not match.');
        return;
      }
      let data: any;
      this.service.getById(sessionStorage.getItem('idu'), "user").subscribe(res => {
        data = res;
        password.user = data;
      });

      let form: any = this.Form.value;
      setTimeout(() => {
        this.passwordCheck(form.oldPassword, password.user.password);
        setTimeout(() => {
          if (!this.pass) {
            this.toastr.error('Old password is not correct.');
            // console.log("old password is not correct")
          } else {
            console.log("old password is correct")
               let plaintext: any = this.Form.value.newPassword;
               let salt = this.operations.genSalt();
               let hashedPasswordPromise =  this.operations.hashPassword(plaintext, salt);
                let saltedpassword : any;
                console.log(hashedPasswordPromise);
               this.getPromiseAsString(hashedPasswordPromise).then((result: any) => {
              password.hashedPassword= result
            });
                setTimeout(() => {
                    saltedpassword = salt.substring(0,8) + password.hashedPassword+salt.substring(8,16)
               this.service.update(sessionStorage.getItem('idu'), {password: saltedpassword}, "user").subscribe(() => {
                 this.toastr.success('password updated successfully.');
                 this.dialogref.close();
               });
          },100);
          }
        }, 500);
      }, 50);
    }
     else {
      this.toastr.success('Please fill all required fields.');
    }
  }

  getPromiseAsString(promise: any) {
    return promise.then((result: { toString: () => any; }) => {
      return result.toString();
    });
  }

  ngOnInit(): void {

  }

  private passwordCheck(passwordT: any, passwordD: any) {
    let pass: boolean = false;
    let salt = passwordD.substring(0, 8) + passwordD.substring(passwordD.length - 8, passwordD.length);
    // console.log(salt)
    // console.log(passwordD)
    let hashedPasswordPromise = this.operations.hashPassword(passwordT, salt);
    let saltedpassword: any;
    // setTimeout(() => {
    this.getPromiseAsString(hashedPasswordPromise).then((result: any) => {
      password.hashedPassword = result
      // console.log(password.hashedPassword);
    });
    // }, 50);
    setTimeout(() => {
      saltedpassword = salt.substring(0, 8) + password.hashedPassword + salt.substring(8, 16)
      // console.log(saltedpassword)
      // console.log(passwordD)
    }, 100);
    setTimeout(() => {
      if (saltedpassword === passwordD) {
        this.pass = true;
      }
    }, 150);
  }

}
