import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDeletePopupComponent } from './base-delete-popup.component';

describe('ProjectDeletePopupComponent', () => {
  let component: BaseDeletePopupComponent;
  let fixture: ComponentFixture<BaseDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDeletePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
