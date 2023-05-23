import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements DoCheck{
  title = 'authentication';
  isadmin=false;
  isMenuVisible=false;
  constructor(private route:Router){
    let role=sessionStorage.getItem('type');
    if(role=='admin'){
      this.isadmin=true;
    }
  }
  pm:boolean=false;
  member:boolean=false;

 pmxadmin: boolean = false;



  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role=sessionStorage.getItem('type');
    this.isMenuVisible = currentroute != '/login';

    this.isadmin = role == 'admin';
      let role2=sessionStorage.getItem('pm');
    if(role2=='true'){
      this.pm=true;
    }
    else {
      this.member=true;
    }
    if (this.pm || this.isadmin) {
      this.pmxadmin = true;
    }
  }
}
