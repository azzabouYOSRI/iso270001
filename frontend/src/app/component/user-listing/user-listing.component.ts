import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePopupComponent} from "../update-popup/update-popup.component";

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit{
  constructor(private service: AuthService,private dialog: MatDialog) {
    this.loadUserList();
  }



  userlist: any;
  dataSource: any;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadUserList() {
    this.service.getAllUser().subscribe(data => {
      this.userlist = data;
      this.dataSource = new MatTableDataSource (this.userlist);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
  }
   updateUser(idu: any) {
    this.openDialog('1000ms', '600ms', idu);
  }

  openDialog(enterAnimation: any,exitAnimation : any, idu: String) {
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      width: '30%',
      data: {
        idu: idu
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadUserList();
    });
  }

  DeleteUser(idu: any) {
    console.log(idu);
  }

  displayedColumns: string[] = ['idu', 'name', 'surname', 'email', 'password', 'typeOfUser', 'phone', 'address',  'gender','activeAccount','action'];


 ngOnInit(): void {

    }
}

