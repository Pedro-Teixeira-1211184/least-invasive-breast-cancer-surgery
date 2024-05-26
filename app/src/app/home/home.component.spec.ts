import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a method to logout', () => {
    expect(component.logout).toBeDefined();
  });

  it('should have methods to navigate to different views', () => {
    expect(component.goHome).toBeDefined();
    expect(component.showStaffRequests).toBeDefined();
    expect(component.showPatientRequests).toBeDefined();
    expect(component.showPatientModels).toBeDefined();
    expect(component.uploadDoctorModels).toBeDefined();
    expect(component.showImagiologistModels).toBeDefined();
  });

  it('should change the view when calling navigation methods', () => {
    component.goHome();
    expect(component.home_body).toBe(true);
    expect(component.staff_requests).toBe(false);
    expect(component.patients_requests).toBe(false);
    expect(component.view_patient_models).toBe(false);
    expect(component.upload_doctor).toBe(false);
    expect(component.view_imagiologist_models).toBe(false);

    component.showStaffRequests();
    expect(component.staff_requests).toBe(true);
    expect(component.home_body).toBe(false);
    expect(component.patients_requests).toBe(false);
    expect(component.view_patient_models).toBe(false);
    expect(component.upload_doctor).toBe(false);
    expect(component.view_imagiologist_models).toBe(false);

    component.showPatientRequests();
    expect(component.patients_requests).toBe(true);
    expect(component.home_body).toBe(false);
    expect(component.staff_requests).toBe(false);
    expect(component.view_patient_models).toBe(false);
    expect(component.upload_doctor).toBe(false);
    expect(component.view_imagiologist_models).toBe(false);

    component.showPatientModels();
    expect(component.view_patient_models).toBe(true);
    expect(component.home_body).toBe(false);
    expect(component.staff_requests).toBe(false);
    expect(component.patients_requests).toBe(false);
    expect(component.upload_doctor).toBe(false);
    expect(component.view_imagiologist_models).toBe(false);

    component.uploadDoctorModels();
    expect(component.upload_doctor).toBe(true);
    expect(component.home_body).toBe(false);
    expect(component.staff_requests).toBe(false);
    expect(component.patients_requests).toBe(false);
    expect(component.view_patient_models).toBe(false);
    expect(component.view_imagiologist_models).toBe(false);

    component.showImagiologistModels();
    expect(component.view_imagiologist_models).toBe(true);
    expect(component.home_body).toBe(false);
    expect(component.staff_requests).toBe(false);
    expect(component.patients_requests).toBe(false);
    expect(component.view_patient_models).toBe(false);
    expect(component.upload_doctor).toBe(false);
  });

  it('should logout when calling logout method', async () => {
    const authSpy = spyOn(component.auth, 'logout');
    await component.logout();
    expect(authSpy).toHaveBeenCalled();
  });
});
