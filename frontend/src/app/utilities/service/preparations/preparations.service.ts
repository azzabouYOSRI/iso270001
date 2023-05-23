import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {OperationsService} from "../operations/operations.service";

@Injectable({
  providedIn: 'root'
})
export class PreparationsService {

  constructor(
    private  service: HttpService,
    private operations: OperationsService,
  ) { }

  checkMembership() {
    let idu:any;
    idu=sessionStorage.getItem('idu');
    let projects:string[]=[];
    let projectsRoles:string[]=[];
    let result:any;
    this.service.getidbyidu(idu,'member').subscribe(data => {
    result = data;
    for(const element of result){
      if(element.user.idu==idu && element.project.activeProject=="true"){
        let idp:string =element.project.idp.toString()
        projects.push(idp)
        projectsRoles.push(element.isPm)
      }
    }
              sessionStorage.setItem('projects', JSON.stringify(projects));
              sessionStorage.setItem('projectsRoles', JSON.stringify(projectsRoles));
    })
  }
  checkPmExistence() {
    let idps: any[] = [0,0];
    idps = this.operations.getArray('idps');
    let pmExistenceInProjects: string[] = new Array(idps.length).fill("false");
    let j=0;
    let z=0;
    for (let i=0;i<idps.length; i++) {
      if (j>0){
      pmExistenceInProjects= this.operations.getArray('pmExistenceInProjects');
    }
       setTimeout(() => {
          this.service.getbyidp(idps[i], 'member').subscribe((members: any) => {
        while (z<members.length) {
          if (members[z].isPm=="true"){
            pmExistenceInProjects[i] = "true";
          }
          else {
            pmExistenceInProjects[i] = "false";
          }
          z++;
        }
        sessionStorage.setItem('pmExistenceInProjects', JSON.stringify(pmExistenceInProjects));
      });
      j++;
      }, 1000);

    }
  }

 storeMembersNames() {
    let idp:any;
    idp=sessionStorage.getItem('selectedProject');
    let membersNames: any[] = [];
    let membersIds: any[] = [];
    this.service.getbyidp(idp,'member').subscribe((data: any) => {
      for (const element of data) {
              membersNames.push(element.user.name + ' ' + element.user.lastname);
              membersIds.push(element.id.toString());
      }
      sessionStorage.setItem('membersNames', JSON.stringify(membersNames));
      sessionStorage.setItem('membersIds', JSON.stringify(membersIds));
      if (membersNames.length==0){
        membersNames= ['','']
              sessionStorage.setItem('membersNames', JSON.stringify(membersNames));
        sessionStorage.setItem('membersIds', JSON.stringify(membersIds));
      }
    });
  }
    storeUserNames() {
    let usersNames: any[] = [];
    let usersIds: any[] = [];
    let allowCustomers: any;
    allowCustomers = sessionStorage.getItem('add');
    this.service.getAll('user').subscribe((data: any) => {
      data.forEach((user: { name: string; lastname: string; idu: string ,typeOfUser:string}) => {
           if (allowCustomers == 'pm') {
          if (user.typeOfUser !== 'customer' && user.typeOfUser !== 'cutomerUser') {
                    usersNames.push(user.name + ' ' + user.lastname);
                    usersIds.push(user.idu.toString());
          }
    }
           else {
               usersNames.push(user.name + ' ' + user.lastname);
               usersIds.push(user.idu.toString());
           }
      });
          sessionStorage.setItem('usersNames', JSON.stringify(usersNames));
          sessionStorage.setItem('usersIds', JSON.stringify(usersIds));
    });
  }
  storeAllIdps()
  {
    let idps:any[]=[];
    this.service.getAll('project').subscribe((data:any)=>{
      for (const element of data) {
        idps.push(element.idp.toString());
      }
      sessionStorage.setItem('idps', JSON.stringify(idps));
    })
  }
     storePhases() {
    let idp:any;
    let phasesNames: string[] = [];
    let phasesIds: string[] = [];
    let phasesPositions: string[] = [];
    let subPhasesNames: string[] = [];
    let subPhasesIds: string[] = [];
    let subPhasesPositions: string[] = [];
    let subPhasesParent: string[] = [];

    idp = sessionStorage.getItem('selectedProject');
    this.service.getbyidp(idp, 'phase').subscribe(res => {
      for (const phase of res) {
        if(phase.project.alternateId !=="default"){
        if(phase.isSubPhase=="false"){
          phasesNames.push(phase.name)
          phasesIds.push(phase.id.toString())
          phasesPositions.push(phase.position)
        }
         if(phase.isSubPhase=="true"){
          subPhasesNames.push(phase.name)
          subPhasesIds.push(phase.id.toString())
          subPhasesPositions.push(phase.position)
           subPhasesParent.push(phase.parent.name)
        }
      }}
      sessionStorage.setItem('phasesNames', JSON.stringify(phasesNames));
      sessionStorage.setItem('phasesIds', JSON.stringify(phasesIds));
      sessionStorage.setItem('phasesPositions', JSON.stringify(phasesPositions));
      sessionStorage.setItem('subPhasesNames', JSON.stringify(subPhasesNames));
      sessionStorage.setItem('subPhasesIds', JSON.stringify(subPhasesIds));
      sessionStorage.setItem('subPhasesPositions', JSON.stringify(subPhasesPositions));
      sessionStorage.setItem('subPhasesParent', JSON.stringify(subPhasesParent));
    });
  }
  storePhasesForDefault() {
    let idp:any;
    let phasesNames: string[] = [];
    let phasesIds: string[] = [];
    let phasesPositions: string[] = [];
    let subPhasesNames: string[] = [];
    let subPhasesIds: string[] = [];
    let subPhasesPositions: string[] = [];
    let subPhasesParent: string[] = [];

    idp = sessionStorage.getItem('selectedProject');
    this.service.getbyidp(idp, 'phase').subscribe(res => {
      for (const phase of res) {
        if(phase.project.alternateId =="default"){
        if(phase.isSubPhase=="false"){
          phasesNames.push(phase.name)
          phasesIds.push(phase.id.toString())
          phasesPositions.push(phase.position)
        }
         if(phase.isSubPhase=="true"){
          subPhasesNames.push(phase.name)
          subPhasesIds.push(phase.id.toString())
          subPhasesPositions.push(phase.position)
           subPhasesParent.push(phase.parent.name)
        }
      }
      }
      sessionStorage.setItem('phasesNames', JSON.stringify(phasesNames));
      sessionStorage.setItem('phasesIds', JSON.stringify(phasesIds));
      sessionStorage.setItem('phasesPositions', JSON.stringify(phasesPositions));
      sessionStorage.setItem('subPhasesNames', JSON.stringify(subPhasesNames));
      sessionStorage.setItem('subPhasesIds', JSON.stringify(subPhasesIds));
      sessionStorage.setItem('subPhasesPositions', JSON.stringify(subPhasesPositions));
      sessionStorage.setItem('subPhasesParent', JSON.stringify(subPhasesParent));
    });
  }

  // storeCompanyNames() {
  //   this.service.getAll("user").subscribe(res => {
  //     let user = res;
  //   user = res;
  //   let companiesNames: string[] = [];
  //   for (const element of user) {
  //     if (element.companyName !== null)
  //     companiesNames.push(element.companyName);
  //   }
  //   sessionStorage.setItem('companiesNames', JSON.stringify(companiesNames));
  // });
  // }
}
