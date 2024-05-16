import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsPatientComponent } from './requests-patient.component';

describe('RequestsPatientComponent', () => {
  let component: RequestsPatientComponent;
  let fixture: ComponentFixture<RequestsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
