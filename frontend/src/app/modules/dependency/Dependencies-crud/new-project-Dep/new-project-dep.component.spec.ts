import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectDepComponent } from './new-project-dep.component';

describe('NewProjectDepComponent', () => {
  let component: NewProjectDepComponent;
  let fixture: ComponentFixture<NewProjectDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProjectDepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
