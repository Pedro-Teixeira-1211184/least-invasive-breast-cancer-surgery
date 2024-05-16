import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsStaffComponent } from './requests-staff.component';

describe('RequestsStaffComponent', () => {
  let component: RequestsStaffComponent;
  let fixture: ComponentFixture<RequestsStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
