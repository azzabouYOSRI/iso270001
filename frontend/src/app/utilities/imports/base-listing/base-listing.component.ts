import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpService} from "../../service/http/http.service";
import {FormBuilder, Validators} from "@angular/forms";
import {OperationsService} from "../../service/operations/operations.service";
import {PreparationsService} from "../../service/preparations/preparations.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-base-listing',
  templateUrl: './base-listing.component.html',
  styleUrls: ['./base-listing.component.css']
})
export class BaseListingComponent implements OnInit{
   title: string = "title example"
   isPM: boolean=false;
  constructor(
    protected service: HttpService,
    protected dialog: MatDialog,
    protected router : Router,
    protected builder: FormBuilder,
    protected operations: OperationsService,
    protected toastr: ToastrService,
    protected preparation: PreparationsService) {
    this.roundedNumber = Math.round(this.number * 10) / 10;
  }

  ngOnInit(): void {
          this.fixAllowAddPM();
          this.isPM = this.operations.isPmHandler();
          if(sessionStorage.getItem('homeDefaultPm')=='true' && sessionStorage.getItem('type')=='admin'){
            this.isPM=true;
          }
    }
    roundedNumber: number=0;
    number: number = 0;
  titleHandler(){}

  allowAddPm: boolean = false;


   filterForm = this.builder.group({
    keyword: this.builder.control('', Validators.required),
    field: this.builder.control(''),
  });
  dataSource: any;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadList(endpoint:string) {
    let list:any;
    if (this.endpoint=='member'){
      this.preparation.storeUserNames();
        this.preparation.storeMembersNames();
        this.preparation.checkPmExistence();
      }
    this.service.getAll(endpoint).subscribe(data => {
      list = data;
            list= this.operations.replaceNullsWithDash(list);
            this.dataTable = list;
      list = this.filter(list)
      let wr:any[]=[];
      if (this.endpoint=='user') {
        for (const i of list) {
          if(i.name != 'root'|| i.lastName != 'root'){
            wr.push(i);
          }
        }
        list=wr;
      }
      this.dataSource = new MatTableDataSource (list);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    })
  }

  dataTable: any[] = [];
  endpoint : string = "";

   update(id: any,component:any) {
    this.openDialog('1000ms', '600ms', id,component);
  }
  allowAddMember: boolean = false;


  openDialog(enterAnimation: any,exitAnimation : any, id: any,component:any) {
    const popup = this.dialog.open(component, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      width: '39%',
      data: {
        id: id}
    });
    popup.beforeClosed().subscribe(() => {
      this.preparation.storeAllIdps();
      this.preparation.checkMembership();
      if (this.endpoint === 'member') {
      let d = sessionStorage.getItem('deletedPm');
        if (d!=="true"){
            this.allowAddPm = this.operations.allowAddPm();
        }
      }
    });
    popup.afterClosed().subscribe(() => {
      this.loadList(this.endpoint);
      let d = sessionStorage.getItem('deletedPm');
        if (d!=="true"){
            this.allowAddPm = this.operations.allowAddPm();
        }
    });
  }

  filter(list:any) : any[] {
     return list;
}
  delete(id: any,component:any) {
     if (this.endpoint === 'member') {
           sessionStorage.setItem('pm','false');
     }
    this.openDialog('1000ms', '600ms', id,component);
  }
 createNew(component:any) {
    this.openDialog('1000ms', '600ms', "0",component);
  }
displayedColumns: string[] = [];

  openDialogCaller(element:any,component:any){
    sessionStorage.setItem('sp',element.idp)
    this.operations.openDialog(1000,600,element,component);
  }

   fixAllowAddPM() {
    if(this.endpoint === 'member'){
                  let b:boolean = false;

       this.isPM = this.operations.isPmHandler();
       this.service.getAll('member').subscribe(data => {
          let list = data;
          if(list.length>0){
            let i:number = 0;
            while(i<list.length && !b){
              if(list[i].isPm == "true"){
                b = true;
                sessionStorage.setItem('deletedPm','false');
              }
              else{
              i++;}
              if (!b){
                sessionStorage.setItem('deletedPm','true');
            }
          }
       }}
          );
       setTimeout(() => {
         if (sessionStorage.getItem('deletedPm') == 'true'||!b) {
           this.allowAddPm = true
                                 console.log("hello")

         } else {
           this.allowAddPm = this.operations.allowAddPm();
         }
       }, 150);
    }

  }
}


