import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  typeOfUser=['admin','employee','customer','customerUser'];
  registerform = this.builder.group({
    phone: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(8)])),
    name: this.builder.control('', Validators.required),
    adress: this.builder.control(''),
    surname: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    typeOfUser: this.builder.control(''),
    activeAccount: this.builder.control(true)
  });




  proceedRegister() {
    if (this.registerform.valid) {
      console.log(this.registerform.value);
      this.service.RegisterUser(this.registerform.value).subscribe(() => {
        this.router.navigate([''])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}
