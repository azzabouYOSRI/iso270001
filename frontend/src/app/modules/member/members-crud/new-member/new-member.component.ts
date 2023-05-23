import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {OperationsService} from "../../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../../utilities/service/http/http.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelectChange} from "@angular/material/select";
import {PreparationsService} from "../../../../utilities/service/preparations/preparations.service";

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.css']
})
export class NewMemberComponent {
  members: any;
  users: any;
  names: string[] = [];
  ids: string[] = [];
  formValue: any;
  memberForm = this.builder.group({
    type: this.builder.control('', Validators.required),
  });

  constructor(
    protected builder: FormBuilder,
    protected service: HttpService,
    protected router: Router,
    protected toastr: ToastrService,
    protected _operations: OperationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogref: MatDialogRef<NewMemberComponent>,
    private preparation: PreparationsService,
  ) {
  }

  get operations(): OperationsService {
    return this._operations;
  }

  set operations(value: OperationsService) {
    this._operations = value;
  }

  proceedAdd() {
    if (this.memberForm.valid) {
      this.formValue = this.memberForm.value;
        let add = sessionStorage.getItem('add')
       this.formValue.isPm = (add === 'pm');
      this.formValue.project = {
        idp: sessionStorage.getItem('selectedProject')
      };
      this.iduser = sessionStorage.getItem('selectedUser');
      this.formValue.user = {
        idu: this.iduser
      };
      delete this.formValue.type;
      this.submit(0);
      setTimeout(() => {
        this.preparation.storeMembersNames();
        this.preparation.storeUserNames();
        this.dialogref.close();
      }, 500);

    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  submit(idx: number) {
    this.service.add(this.formValue, "member").subscribe(() => {
      this.toastr.success('Project member Added Successfully');
      let add = sessionStorage.getItem('add')
      if (add === 'pm') {
        sessionStorage.setItem('addedPm', 'true');
            sessionStorage.setItem('deletedPm', 'false')
      }
      else {
        sessionStorage.setItem('addedPm', 'false');
      }
    });
  }
  iduser: any;
  title: string='';

  ngOnInit() {
    this.title = sessionStorage.getItem('add') === 'pm' ? 'Add New Project Manager' : 'Add New Project Member';
    this.members = this.operations.getArray('membersNames');
    this.users = this.operations.getArray('usersNames');
    this.ids = this.operations.getArray('usersIds');
    this.names = this.operations.filter(this.users, this.members)
  }

  onOptionSelected($event: MatSelectChange) {
    this.operations.searchIdByName($event.value,this.users,this.ids,'User');
  }
}
