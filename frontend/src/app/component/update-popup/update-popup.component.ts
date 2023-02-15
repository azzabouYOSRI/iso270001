import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  private user: any;
  private idx: any;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  typeOfUser = ['admin', 'employee', 'customer', 'customerUser'];
     updateForm = this.builder.group({
      phone: this.builder.control(''),
      name: this.builder.control(''),
      adress: this.builder.control(''),
      surname: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')),
      email: this.builder.control('', Validators.email),
      gender: this.builder.control(''),
      typeOfUser: this.builder.control(''),
      activeAccount: this.builder.control('')
     });

  proceedUpdate() {
   this.service.updateuser(this.idx, this.updateForm.value).subscribe(() => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }
loadUserData(idu: any) {
    this.idx= idu;
    this.service.GetUserbyId(idu).subscribe
    (res => {
      this.user = res
      this.updateForm.patchValue({
        phone: this.user.phone,
        name: this.user.name,
        adress: this.user.adress,
        surname: this.user.surname,
        email: this.user.email,
        typeOfUser: this.user.typeOfUser,
        activeAccount: this.user.activeAccount,
        gender: this.user.gender,
        password: this.user.password,
      });});
    console.log(this.idx)
}









  ngOnInit(): void {
    if (this.data.idu != '' && this.data.idu != null) {
      this.loadUserData(this.data.idu);
    }
  }

}
