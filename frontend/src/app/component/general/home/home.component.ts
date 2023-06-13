import {Component, OnInit} from '@angular/core';
import {PreparationsService} from "../../../utilities/service/preparations/preparations.service";
import {OperationsService} from "../../../utilities/service/operations/operations.service";
import {HttpService} from "../../../utilities/service/http/http.service";
import {NewPhaseComponent} from "../../../modules/phase/crud/new-phase/new-phase.component";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  static allProjects: any;
  static allMembers: any;
  static status: boolean = false;
  static project: any;
  // }
  static idpd: any;
  static allPhases: any;
  static allActivities: any;
  static exist: boolean = true;
  admin: boolean = false;
  projectsNames: string[] = [];
  projectName: any;
  projectProgress: string = "";
  projectProgressbar: number = 0;
  projectStart: any;
  projectEnd: any;
  projectStatus: any;
  projectRealStartDate: any;
  projectRealEndDate: any;

  phaseName: any;
  phaseProgress: string = "";
  phaseProgressbar: number = 0;
  phaseStart: any;
  phaseEnd: any;
  phaseStatus: any;
  phaseRealStartDate: any;
  phaseRealEndDate: any;

  activtiyName: any;
  activtiyProgress: string = "";
  activtiyProgressbar: number = 0;
  activtiyStart: any;
  activtiyEnd: any;
  activtiyStatus: any;
  activtiyRealStartDate: any;
  activtiyRealEndDate: any;


  cost: any;
  budget: string = "";
  progressbar: number = 0;
  progress: any;

  formValue: any;
  form = this.builder.group({
    project: this.builder.control(''),
  });

  //   this.service.getByAlternativeId('default', 'project', this.preparation.idpId).subscribe(
  //     (data: any) => {
  //
  spacer: string = "   |   ";
  b: boolean = false;
  //     });
  protected readonly Number = Number;
  private idps: string[] = [];
  private currentPhaseId: any;
  private projects2: any[] = [];
  private authorize: Boolean = false;

  constructor(
    private preparation: PreparationsService,
    private operations: OperationsService,
    private service: HttpService,
    private builder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // HomeComponent.allProjects = '';
    // HomeComponent.allMembers = '';
    // HomeComponent.status = false
    // HomeComponent.project = '';
    // HomeComponent.idpd = '';
    // HomeComponent.allPhases = '';
    // HomeComponent.allActivities = '';
    sessionStorage.setItem('homeDefaultPm', 'true');
    sessionStorage.removeItem("selectedProjectDash");
    sessionStorage.setItem('subphaseTypeSwitch', 'switchToDefault');
    this.DefaultProjectExistence();
    this.preparation.checkMembership()
    this.preparation.storeAllIdps()
    if (sessionStorage.getItem('type') == "admin") {
      this.admin = true;
    }
    if (sessionStorage.getItem('type') == "user") {
      this.admin = false;
    }
    setTimeout(() => {
 if (this.admin) {
      this.storeAllIProjects();
    } else {
      this.storeAllIProjectsUser();
    }
    },100)

    setTimeout(() => {

    }, 100)
    this.preparation.storePhasesForDefault();
  }

  storeAllIProjects() {
    this.service.getAll("project").subscribe((projects) => {
      for (const project of projects) {
        if (project.alternateId != "default") {
          this.projectsNames.push(project.name + " " + Number(project.progress).toFixed(2) + "%")
          this.idps.push(project.idp)
        }
      }
      if (projects[0].alternateId != "default") {
        sessionStorage.setItem('selectedProjectDash', projects[0].idp);
                sessionStorage.setItem('selectedProject', projects[0].idp);
      } else {
        sessionStorage.setItem('selectedProjectDash', projects[1].idp);
                sessionStorage.setItem('selectedProject', projects[1].idp);
      }
      this.b = true;
      HomeComponent.allProjects = projects;
    });
    setTimeout(() => {
      // console.log(HomeComponent.allProjects);
      if (this.b) {
        if (HomeComponent.allProjects[0].alternateId != "default") {
          this.projectModel(HomeComponent.allProjects[0].idp);
          this.authorize = true;
          this.phaseModel(HomeComponent.allProjects[0].idp)

        } else {
          this.projectModel(HomeComponent.allProjects[1].idp);
          this.authorize = true;
          this.phaseModel(HomeComponent.allProjects[1].idp)

        }
      }
    }, 100);
  }

  onOptionSelected($event: MatSelectChange) {
    // this.resetAll();
    this.operations.searchIdByName($event.value, this.projectsNames, this.idps, 'ProjectDash');
    this.projectName = $event.value;
    this.form.reset();
    this.projectModel(Number(sessionStorage.getItem('selectedProjectDash')));
    let idp: any;
    idp = sessionStorage.getItem('selectedProjectDash');
    this.authorize = true;
    this.phaseModel(idp)
  }

  projectModel(id2: number) {
    let id: number = 0;
    let i = 0;
    let b = true;

    while (i < HomeComponent.allProjects.length && b) {
      // console.log(HomeComponent.allProjects[i].idp ==id2);
      if (HomeComponent.allProjects[i].idp == id2) {
        id = i;
        b = false;
        break;
      } else {
        i++
      }
    }
    let projects: any;
    if (this.admin) {
      projects = HomeComponent.allProjects;
    } else {
      projects = this.projects2;
    }

    // this.projectName = "Project name:  " +this.projectsNames[id];
    // HomeComponent.allProjects.filter((project: { idp: number; }) => project.idp == id);
    this.projectName = "Project name:  " + projects[id].name;
    this.projectProgress = "Progress:  " + Number(projects[id].progress).toFixed(2) + "%";
    this.projectProgressbar = Number(projects[id].progress);
    this.projectStart = "Start Date: " + projects[id].startDate;
    if (projects[id].endDate == "" || projects[id].endDate == null) {
      this.projectEnd = "End Date: -";
    } else {
      this.projectEnd = "End Date: " + projects[id].endDate;
    }
    let statusAux: string = ""
    if (projects[id].startDate < projects[id].realStartDate) {
      this.projectStatus = "Status: started late"
      statusAux = "started late and "
      this.projectRealStartDate = " | Real start Date: " + projects[id].realStartDate;
    }
    if (projects[id].endDate < projects[id].realEndDate) {
      this.projectStatus = "Status: " + statusAux + " finished late"
      this.projectRealEndDate = " | Real End Date: " + projects[id].realEndDate;
    }
    if ((projects[id].startDate == projects[id].realStartDate && projects[id].endDate == projects[id].realEndDate) ||
      (projects[id].realStartDate == null && projects[id].realEndDate == null) ||
      (projects[id].startDate > projects[id].realStartDate && projects[id].endDate > projects[id].realEndDate)
    ) {
      this.projectStatus = "Status:  on time"
    }
    this.budget = "Budget: " + Number(projects[id].budget).toFixed(2);

    if (projects[id].cost2 == "" || projects[id].cost2 == null) {
      this.cost = "cost: -";
    } else {
      this.cost = "cost: " + Number(projects[id].cost2).toFixed(2);
    }
    if (projects[id].budget == "" || projects[id].budget == null) {
      this.budget = "Budget: -";
    } else {
      this.budget = "Budget: " + Number(projects[id].budget).toFixed(2);
    }

    let progress2 = Number(projects[id].cost2) / Number(projects[id].budget) * 100;
    console.log(projects[id].cost2);
    this.progressbar = progress2;
    this.progress = "Progress: " + progress2.toFixed(2) + "%";
  }

  phaseModel(id: number) {
    let ordredPhases: any[] = [];
    // console.log(this.authorize);
    if (this.authorize) {
      this.service.getbyidp(Number(id), "phase").subscribe((phases) => {
        HomeComponent.allPhases = phases;
      });
      setTimeout(() => {

        let b: boolean = false;
        let i: number = 0;
// console.log(HomeComponent.allPhases)
        for (const phase of HomeComponent.allPhases) {
          // console.log(phase);
          if (!isNaN(Number(phase.posistion))) {

            ordredPhases.push(phase);
            // console.log("!nan");
          }
        }
        ordredPhases.sort((a: { posistion: number; }, b: { posistion: number; }) => a.posistion - b.posistion);
        // console.log(ordredPhases)
        while (!b && i < ordredPhases.length) {
          this.ActivityModel(ordredPhases[i].id);

          if (Number(ordredPhases[i].progress) < 100) {
            this.phaseName = "Phase name:  " + ordredPhases[i].name;
            // console.log(ordredPhases[i].progress + " " + ordredPhases[i].name)
            this.phaseProgress = "Progress:  " + Number(ordredPhases[i].progress).toFixed(2) + "%";
            this.phaseProgressbar = Number(ordredPhases[i].progress);
            this.phaseStart = "Start Date: " + ordredPhases[i].startDate;
            if (ordredPhases[i].endDate == "" || ordredPhases[i].endDate == null) {
              this.phaseEnd = "End Date: -";
            } else {
              this.phaseEnd = "End Date: " + ordredPhases[i].endDate;
            }
            if (
              (ordredPhases[i].startDate == ordredPhases[i].realStartDate && ordredPhases[i].endDate == ordredPhases[i].realEndDate) ||
              (ordredPhases[i].realStartDate == null && ordredPhases[i].realEndDate == null) ||
              (ordredPhases[i].startDate > ordredPhases[i].realStartDate && ordredPhases[i].endDate > ordredPhases[i].realEndDate)
            ) {
              this.phaseStatus = "Status:  on time"
            }
            let statusAux: string = ""
            // console.log(ordredPhases[i].startDate + ordredPhases[i].realStartDate)
            if (ordredPhases[i].startDate < ordredPhases[i].realStartDate) {
              this.phaseStatus = "Status: started late"
              statusAux = "started late and "
              this.phaseRealStartDate = " | Real start date: " + ordredPhases[i].realStartDate;
            }
            if (ordredPhases[i].endDate < ordredPhases[i].realEndDate) {
              this.phaseStatus = "Status: " + statusAux + " finished late"
              this.phaseRealEndDate = " | Real end date: " + ordredPhases[i].realEndDate;
            }
            b = true;
          } else {
            i++;
          }
        }
      }, 100);
    }
  }

  ActivityModel(id: number) {
    // console.log(id)
    let ordredActivities: any[] = [];
    let filteredActiviities: any[] = [];
    this.service.getAll("activity").subscribe((activities) => {
      HomeComponent.allActivities = activities;
    });
    setTimeout(() => {
      // console.log(HomeComponent.allActivities)
      for (const activity of HomeComponent.allActivities) {
        if (activity.phase.id.toString() == id.toString()) {
          filteredActiviities.push(activity);
          // console.log("pushed")
        }
      }

      let b: boolean = false;
      let i: number = 0;
      for (const act of filteredActiviities) {
        // console.log(act);
        if (!isNaN(Number(act.posistion))) {
          ordredActivities.push(act);
          // console.log("!nan");
        }
      }
      ordredActivities.sort((a: { posistion: number; }, b: { posistion: number; }) => a.posistion - b.posistion);
      // console.log(ordredActivities)
      while (!b && i < ordredActivities.length) {
        if (Number(ordredActivities[i].progress) < 100) {
          this.activtiyName = "Activity name:  " + ordredActivities[i].name;
          this.activtiyProgress = "Progress:  " + Number(ordredActivities[i].progress).toFixed(2) + "%";
          this.activtiyProgressbar = Number(ordredActivities[i].progress);

          this.activtiyStart = "Start Date: " + ordredActivities[i].startDate;
          if (ordredActivities[i].endDate == "" || ordredActivities[i].endDate == null) {
            this.activtiyEnd = "End Date: -";
          } else {
            this.activtiyEnd = "End Date: " + ordredActivities[i].endDate;
          }
          if (
            (ordredActivities[i].startDate == ordredActivities[i].realStartDate && ordredActivities[i].endDate == ordredActivities[i].realEndDate) ||
            (ordredActivities[i].realStartDate == null && ordredActivities[i].realEndDate == null) ||
            (ordredActivities[i].startDate > ordredActivities[i].realStartDate && ordredActivities[i].endDate > ordredActivities[i].realEndDate)
          ) {
            this.activtiyStatus = "Status:  on time"
          }
          let statusAux: string = ""
          // console.log(ordredActivities[i].startDate + ordredActivities[i].realStartDate)
          if (ordredActivities[i].startDate < ordredActivities[i].realStartDate) {
            this.activtiyStatus = "Status: started late"
            statusAux = "started late and "
            this.activtiyRealStartDate = " | Real start date: " + ordredActivities[i].realStartDate;
          }
          if (ordredActivities[i].endDate < ordredActivities[i].realEndDate) {
            this.activtiyStatus = "Status: " + statusAux + " finished late"
            this.activtiyRealEndDate = " | Real end date: " + ordredActivities[i].realEndDate;
          }
          this.currentPhaseId = ordredActivities[i].id;
          b = true;
        } else {
          i++;
        }
      }
    }, 100);
  }

  // resetAll() {
  //   this.projectName = "";
  //   this.projectProgress = "";
  //   this.projectProgressbar = 0;
  //   this.projectStart = "";
  //   this.projectEnd = "";
  //   this.projectStatus = "";
  //   this.projectRealStartDate = "";
  //   this.projectRealEndDate = "";
  //
  //   this.phaseName = "";
  //   this.phaseProgress = "";
  //   this.phaseProgressbar = 0;
  //   this.phaseStart = "";
  //   this.phaseEnd = "";
  //   this.phaseStatus = "";
  //   this.phaseRealStartDate = "";
  //   this.phaseRealEndDate = "";
  //
  //   this.activtiyName = "";
  //   this.activtiyProgress = "";
  //   this.activtiyProgressbar = 0;
  //   this.activtiyStart = "";
  //   this.activtiyEnd = "";
  //   this.activtiyStatus = "";
  //   this.activtiyRealStartDate = "";
  //   this.activtiyRealEndDate = "";
  // }


  newDefaultPhase() {

    this.service.getByAlternativeId("default", "project").subscribe(item => {
      let data: any;
      data = item;
      HomeComponent.idpd = data.idp;
    });
    setTimeout(() => {
      sessionStorage.setItem('selectedProject', HomeComponent.idpd);
      this.operations.openDialog39(1000, 600, HomeComponent.idpd, NewPhaseComponent);
    }, 100);
  }

  listDefaultPhases() {
    this.service.getByAlternativeId("default", "project").subscribe(item => {
      let data: any;
      data = item;
      HomeComponent.idpd = data.idp;
    });
    setTimeout(() => {
      sessionStorage.setItem('selectedProject', HomeComponent.idpd);
      sessionStorage.setItem('default', "true");
      this.operations.goTo("/phases");
    }, 100);
  }

  DefaultProjectExistence() {

    this.service.getAll("phase").subscribe((item: any) => {
    });
    this.service.getByAlternativeId("default", "project").subscribe(item => {
      let result: any;
      result = item;
      if (result.idp.toString() === '0') {
        HomeComponent.exist = false;
      } else {
        HomeComponent.idpd = result.id;
      }
    });
    let project;
    setTimeout(() => {
      if (!HomeComponent.exist) {
        project = {
          name: "Default Project",
          description: "This is the default project",
          activeProject: false,
          alternateId: "default",
          progress: 0,
          startDate: new Date(),
        }
        this.service.add(project, "project").subscribe(item => {
        });
      } else {
        sessionStorage.setItem("selectedProject", HomeComponent.idpd);
      }
    }, 100);
  }

  private storeAllIProjectsUser() {
    this.service.getAll("member").subscribe((member) => {
      HomeComponent.allMembers = member;
    });
    setTimeout(() => {
      for (const member of HomeComponent.allMembers) {
        if (member.user.idu.toString() == sessionStorage.getItem("idu")) {
          // console.log(member);
          this.projects2.push(member.project);
        }
      }
      for (const project of this.projects2) {
        this.projectsNames.push(project.name)
        this.idps.push(project.idp)
      }
      sessionStorage.setItem('selectedProjectDash', this.idps[0]);
      this.projectModel(this.projects2[0].idp);
      this.phaseModel(this.projects2[0].idp);
    }, 100);
  }
}
