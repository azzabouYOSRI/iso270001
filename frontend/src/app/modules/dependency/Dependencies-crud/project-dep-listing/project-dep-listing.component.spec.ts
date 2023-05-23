import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ProjectDepListingComponent
} from "./project-dep-listing.component";

describe('ProjectDepListingComponent', () => {
  let component: ProjectDepListingComponent;
  let fixture: ComponentFixture<ProjectDepListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDepListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDepListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
