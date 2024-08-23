import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMajorFacilityComponent } from './staff-major-facility.component';

describe('StaffMajorFacilityComponent', () => {
  let component: StaffMajorFacilityComponent;
  let fixture: ComponentFixture<StaffMajorFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffMajorFacilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffMajorFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
