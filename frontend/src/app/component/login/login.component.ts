import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  result: any
  loginform = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.required,)
  });

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router) {
    sessionStorage.clear();
  }

  proceedLogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyEmail(this.loginform.value.email).subscribe(item => {
          this.result = item;
          console.log(this.result);


            if (this.result.password === this.loginform.value.password) {
              if (this.result.activeAccount) {
                sessionStorage.setItem('userid', this.result.id);
                sessionStorage.setItem('type', this.result.type);
                this.router.navigate(['']);
              } else {
                this.toastr.error('Please contact Admin', 'InActive User');
              }
            } else {
              this.toastr.error('Invalid credentials');
            }

        }
      );
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}
