import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListingComponent } from './base-listing.component';

describe('ProjectListingComponent', () => {
  let component: BaseListingComponent;
  let fixture: ComponentFixture<BaseListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
