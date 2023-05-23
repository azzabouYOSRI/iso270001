import {Injectable} from '@angular/core';

import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {NewProjectComponent} from "../../../modules/project-management/project-crud/new-project/new-project.component";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private user: any;
  inputValue: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
        private http: HttpService,
  ) {

  }

  stringToArray(input: string): string[] {
    const cleaned = input.replace(/\[|\]/g, ''); // Remove square brackets from string
    return cleaned.split('","').map((s) => s.replace(/"/g, '')); // Split and remove quotes from each element
  }

  checkPriceFormat(inputValue: string): boolean {
    if (typeof inputValue !== 'string') {
      return false;
    }

    return inputValue.charAt(0) === '.' || inputValue.charAt(0) === ',' ||
      inputValue.charAt(inputValue.length - 1) === '.' || inputValue.charAt(inputValue.length - 1) === ',';
  }

  lookupCompanyName(user: any, companyName: string | null | undefined) {
    for (const element of user) {
      if (element.companyName === companyName ) {
        sessionStorage.setItem('idc',element.idu)
      }
    }
  }

  lookupPhaseName(phaseName: string): number {
    let id :number = 0;
    let i = 0;
    let phasesNames = this.getArray('phasesNames');
    let phasesIds = this.getArray('phasesIds');
    while (i<phasesNames.length && id===0) {
      if (phasesNames[i] === phaseName) {
        id = phasesIds[i];
        break;
     }
      i++;
    }
      return id
  }

  generateAlternateId(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  keyPress(event: any) {
    const pattern = /^[0-9,.]*$/;
    const inputChar = event.key || String.fromCharCode(event.which);
    const keyCode = event.keyCode || event.which;

    if (keyCode === 8 || keyCode === 46 || keyCode === 37 || keyCode === 39) {
      // allow backspace/delete/arrow keys
      return;
    }

    if (!pattern.test(this.inputValue + inputChar)) {
      event.preventDefault();
      return;
    }


    this.inputValue += inputChar;
  }

  getArray(key: string) {
    let array: any[];
    let data: any;
    let data2: string = '';
    data = sessionStorage.getItem(key);
    if (data) {
      data2 = data
    }
    array = this.stringToArray(data2);
    return array;
  }

  filter(users: any[], members: any[]): any[] {
    const names = [...users];
    let i = 0;
    while (i < members.length) {
      const member = members[i];
      let j = 0;
      while (j < names.length) {
        if (member === names[j]) {
          names.splice(j, 1);
          i++;
          break;
        } else {
          j++;
        }
      }
      i++;
    }
    return names;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
    goToSecondGen(id: string, path: string, origin:string) {
    if (path=="phases"){
        sessionStorage.setItem("subPhaseFilter","false");
    }
    sessionStorage.setItem('selected'+origin, id);
    this.router.navigate([path]);
  }



  searchIdByName(value: string, names: any, ids: string[], target: string) {
      for (let i = 0; i < ids.length; i++) {
        if (names[i] == value) {
           // this.toastr.info("id: " + ids[i]);
          sessionStorage.setItem('selected'+target, ids[i]);
        }
      }
  }

  isPmHandler():boolean {
    let isPm :boolean= false;
    let i = 0;
    let idps = this.getArray('projects');
    let projectsRoles = this.getArray('projectsRoles');
    if (idps !== null) {
        while (i < idps.length && !isPm) {
          if (idps[i] == sessionStorage.getItem('selectedProject') && projectsRoles[i]=="true") {
            isPm = true;
            break;
          }
          i++;
        }
      }
      return isPm;
    }


  generatePassword(): string {
    const length = 6; // Length of the password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,@+-*';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
  }
   genSalt(): string {
    const length = 16; // Length of the password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,@+-*';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
  }

  checkEndDate(startDate: string, endDate: string): boolean {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  if (endDate=== null|| endDate === undefined|| endDate === ''){
    return true;
  }

 if (year1 > year2) {
    return false;
  }

 if (year1 === year2 && month1 > month2) {
    return false;
  }

 if (year1 === year2 && month1 === month2 && day1 > day2) {
    return false;
 }
  return (!(year1 === year2 && month1 === month2 && day1 === day2));
  }

  openDialog(enterAnimation: any, exitAnimation: any, object: any, component: any) {
    this.dialog.open(component, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      width: '30%',
      data: {
        id: object
      }
    });
  }
   openDialog39(enterAnimation: any, exitAnimation: any, object: any, component: any) {
    this.dialog.open(component, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      width: '39%',
      data: {
        id: object
      }
    });
  }

  isAdminHandler() {
    let role = sessionStorage.getItem('type');
    return role == 'admin';
  }
  allowAddPm(): boolean {
    let pmExistenceInProjects:any[];
    pmExistenceInProjects = this.getArray('pmExistenceInProjects');
    let idps = this.getArray('idps');
    let idp = sessionStorage.getItem('selectedProject');
    let i = 0;
    let j = 0;
    let b:boolean = false;
    let allow:boolean;
    while (i<idps.length && !b) {
      if (idps[i] == idp) {
        b = true;
        j=i;
        break;
      }
      i++;
    }

    if (pmExistenceInProjects[j] == 'true') {
      allow = false;
    }
    else {
      if(!this.isAdminHandler()){
        allow = false;
      }
      let addedPm = sessionStorage.getItem('addedPm');
      allow = addedPm != 'true';
    }
    return allow
  }


  transformationMemberListing(members: any): any[] {

    let list: any = [];
    for (const element of members) {
      if (element.isPm == 'true') {
        delete element.user.typeOfUser;
        element.user.typeOfUser = 'project manager'
        sessionStorage.setItem("pm", "true");
      } else {
        delete element.user.typeOfUser;
        element.user.typeOfUser = 'member'
      }
      if (element.user.companyName !== null && element.user.companyName !== "") {
        delete element.user.typeOfUser;
        element.user.typeOfUser = element.user.companyName;
      }
      delete element.user.password;
      list.push(element.user);
    }
    return list
  }

 replaceNullsWithDash(obj: Record<string, any>): Record<string, any> {
  // Loop through each property of the object
  for (const key in obj) {
    // Check if the property is null
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      // If it is null, replace it with a dash
      obj[key] = '-';
    }
    // If the property is an object itself, recursively call this function on it
    else if (typeof obj[key] === 'object') {
      obj[key] = this.replaceNullsWithDash(obj[key]);
    }
  }
  return obj;
}

 removeDuplicates(strings: string[]): string[] {
const uniqueStrings: string[] = [];
  strings.forEach((string) => {
    if (!uniqueStrings.includes(string)) {
      uniqueStrings.push(string);
    }
  });
  return uniqueStrings;}

//   nextPhaseposistion() {
//     let phasesPosition = this.getArray('phasesPosition');
//     let t2 : number[] = [];
//     for (const element of phasesPosition) {
//       t2.push(Number(element));
//     }
//     let max = Math.max(...t2);
//     return max + 1;
//   }
  hashPassword(plaintext: string, salt: string) {
   const encoder = new TextEncoder();
  const data = encoder.encode(salt+plaintext+salt);
  return new Promise(async (resolve, reject) => {
    try {
      const digest = await crypto.subtle.digest('SHA-256', data);
      resolve(this.ArrayBufferToHexString(digest));
    } catch (err) {
      reject(err);
    }
  });
}

ArrayBufferToHexString(buffer:any) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

}


