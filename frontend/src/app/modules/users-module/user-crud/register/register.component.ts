import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InserteduserComponent} from "./inserteduser/inserteduser.component";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    protected builder: FormBuilder,
    protected service: HttpService,
    protected toastr: ToastrService,
    protected operations: OperationsService,
  ) {}

  typeOfUser=['admin','employee','customer','customer user'];
  userForm = this.builder.group({
    phone: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(13)])),
    name: this.builder.control('', Validators.required),
    companyName: this.builder.control(''),
    lastname: this.builder.control('', Validators.required),
    password: this.builder.control(''),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    typeOfUser: this.builder.control(''),
    activeAccount: this.builder.control(true)
  });


 inputChar: any;
   keyPress(event:any) {
  const pattern = /[0-9\+\-\ ]/;
  this.inputChar = event.key || String.fromCharCode(event.which);
  if (event.keyCode !== 8 && !pattern.test(this.inputChar)) {
    event.preventDefault();
  }
}
 formValue: any;
   static hashedPassword: any;
  isCustomer: boolean =false;
  proceedSave() {

    let saltedpassword;
    if (this.userForm.valid) {
      this.formValue = this.userForm.value;
      this.formValue['activeAccount'] = true;
      let plaintext: any = this.operations.generatePassword();
      let salt = this.operations.genSalt();
      let hashedPasswordPromise = this.operations.hashPassword(plaintext, salt);
      this.getPromiseAsString(hashedPasswordPromise).then((result: any) => {
        RegisterComponent.hashedPassword = result
      });
      setTimeout(() => {
        if(this.formValue['typeOfUser']==='customer user'){
          this.formValue['typeOfUser']='customerUser';
        }
      saltedpassword = salt.substring(0, 8) + RegisterComponent.hashedPassword + salt.substring(8, 16);
      this.formValue['password'] = saltedpassword;
      this.service.add(this.formValue, "user").subscribe(() => {
        this.toastr.success('Saved successfully.');
        this.formValue['password'] = plaintext;
        this.operations.openDialog(1000, 600, this.formValue, InserteduserComponent);
      });
      let notification={
        message: sessionStorage.getItem('userFullName') +' added user with the name : '+this.formValue['name']+' '+this.formValue['lastname'],
        date: new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+new Date().getDay(),
        type: 'admin',
        operation: 'add',
        affectedTable: 'user',
        user :{
          idu: sessionStorage.getItem('idu'),
        }
      }
      this.service.add(notification, "notification").subscribe(() => {

      });
      }, 100);
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

    getPromiseAsString(promise:any) {
  return promise.then((result: { toString: () => any; }) => {
    return result.toString();
  });
}

  onOptionSelected($event: MatSelectChange) {
    if ($event.value === 'customer' || $event.value === 'customer user') {
      this.isCustomer = true;
    }
    else {
      this.isCustomer = false;
    }
  }
}
