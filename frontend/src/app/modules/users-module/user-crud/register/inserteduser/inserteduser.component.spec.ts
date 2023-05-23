import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserteduserComponent } from './inserteduser.component';

describe('InserteduserComponent', () => {
  let component: InserteduserComponent;
  let fixture: ComponentFixture<InserteduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserteduserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserteduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
