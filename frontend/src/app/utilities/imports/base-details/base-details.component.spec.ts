import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDetailsComponent } from './base-details.component';

describe('BaseDetailsComponent', () => {
  let component: BaseDetailsComponent;
  let fixture: ComponentFixture<BaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
