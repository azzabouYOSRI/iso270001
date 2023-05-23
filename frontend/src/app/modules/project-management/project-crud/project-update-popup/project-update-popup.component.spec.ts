import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdatePopupComponent } from './project-update-popup.component';

describe('UpdatePopupComponent', () => {
  let component: ProjectUpdatePopupComponent;
  let fixture: ComponentFixture<ProjectUpdatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUpdatePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
