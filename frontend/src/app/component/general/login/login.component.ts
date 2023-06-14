import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../utilities/service/auth/auth.service";
import {Router} from "@angular/router";
import {OperationsService} from "../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../utilities/service/http/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any
  loginform = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.required,)
  });
  private pass: boolean = false;
  static rootExistance: boolean = false;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private http: HttpService,
    private router: Router,
    private operations: OperationsService
  ) {
    sessionStorage.clear()
  }

  ngOnInit(): void {
    this.rootHandler();
    }

  counterLoginAttempt = 0;
  allowedAttemptCounter = 0;
  b = true;
  hour = (60 * 60 * 1000)

  proceedLogin() {
    if (this.loginform.valid) {
      if (this.counterLoginAttempt > 3 && new Date().getTime() !== Number(localStorage.getItem('t'))) {
        this.toastr.error("Invalid credentials");
        return;
      } else {
        this.service.GetUserbyEmail(this.loginform.value.email).subscribe(item => {
            if (item.idu.toString() === '0') {
              this.toastr.error('Invalid credentials');
            }
            this.result = item;
            const idu = item.idu.toString();
            const type = item.typeOfUser.toString();
            const fullname = item.name.toString() + ' ' + item.lastname.toString();
            this.passwordCheck(this.loginform.value.password, this.result.password);
            setTimeout(() => {
              if (this.pass) {
                if (this.result.activeAccount) {
                  sessionStorage.setItem('idu', idu.toString());
                  sessionStorage.setItem('type', type.toString());
                  sessionStorage.setItem('userFullName', fullname.toString());
                  this.router.navigate(['']);
                } else {
                  this.toastr.error('Please contact Admin', 'InActive account');
                }
              } else {
                this.counterLoginAttempt++;
                if (this.allowedAttemptCounter <= 3 || this.b) {
                  this.allowedAttemptCounter++;
                } else {
                  this.b = false;
                  if (localStorage.getItem('h') !== null) {
                    let h = Number(localStorage.getItem('t')) * 2;
                    localStorage.setItem('h', h.toString());
                    let Curr = new Date().getTime() + (this.hour * h);
                    localStorage.setItem('t', Curr.toString());
                  } else {
                    localStorage.setItem('t', '1');
                  }
                }
                localStorage.setItem('loginCounter', this.counterLoginAttempt.toString());
                this.toastr.error('Invalid credentials');
              }
            }, 200);
          }
        );
      }
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

// this.result.password === this.loginform.value.password
  static hashedPassword: any;

  private passwordCheck(password: any, password2: any) {
    let pass: boolean = false;
    let salt = password2.substring(0, 8) + password2.substring(password2.length - 8, password2.length);
    let hashedPasswordPromise = this.operations.hashPassword(password, salt);
    let saltedpassword: any;
    this.getPromiseAsString(hashedPasswordPromise).then((result: any) => {
      LoginComponent.hashedPassword = result
    });
    setTimeout(() => {
      saltedpassword = salt.substring(0, 8) + LoginComponent.hashedPassword + salt.substring(8, 16)
      // console.log(saltedpassword)
      // console.log(password2)
    }, 100);
    setTimeout(() => {
      if (saltedpassword === password2) {
        this.pass = true;
      }
    }, 200);
  }

  getPromiseAsString(promise: any) {
    return promise.then((result: { toString: () => any; }) => {
      return result.toString();
    });
  }

  rootHandler() {
    let data:any;
this.http.getAll("user").subscribe(item => {
  data = item;
 for(const i of data){
   if(i.name === "root" || i.lastName=="root"){
     LoginComponent.rootExistance = true;
   }
 }
});
    setTimeout(() => {
if(!LoginComponent.rootExistance){
  let user = {
    name: "root",
    lastname: "root",
    email: "root@watracker.com",
    password: "ROOT1234root",
    typeOfUser: "admin",
    activeAccount: "true",
    phone: "0000000000",
    gender: "male"
  }
  this.http.add(user, "user").subscribe(item => {

  });
}
    }, 100);
  }
}
