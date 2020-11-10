import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinesComponent } from './fines.component';

describe('FinesComponent', () => {
  let component: FinesComponent;
  let fixture: ComponentFixture<FinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
