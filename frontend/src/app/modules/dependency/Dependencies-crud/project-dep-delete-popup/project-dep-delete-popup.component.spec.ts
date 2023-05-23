import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ProjectDeletePopupComponent
} from "../../../project-management/project-crud/project-delete-popup/project-delete-popup.component";


describe('ProjectDepDeletePopupComponent', () => {
  let component: ProjectDeletePopupComponent;
  let fixture: ComponentFixture<ProjectDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDeletePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
