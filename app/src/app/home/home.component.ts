import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {NgIf} from "@angular/common";
import Constants from "../utils/Constants";
import {BodyComponent} from "./body/body.component";
import {RequestsStaffComponent} from "./admin/requests-staff/requests-staff.component";
import {RequestsPatientComponent} from "./admin/requests-patient/requests-patient.component";
import {ModelsPatientComponent} from "./patient/models-patient/models-patient.component";
import {UploadDoctorComponent} from "./doctor/upload-doctor/upload-doctor.component";
import {ModelsImagComponent} from "./imagiologist/models-imag/models-imag.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgIf,
    BodyComponent,
    RequestsStaffComponent,
    RequestsPatientComponent,
    ModelsPatientComponent,
    UploadDoctorComponent,
    ModelsImagComponent

  ],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    this.getRole();
  }

  auth: AuthService = inject(AuthService);
  role = localStorage.getItem('role');

  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;
  isImagiologist: boolean = false;

  home_body: boolean = true;
  staff_requests: boolean = false;
  patients_requests: boolean = false;
  view_patient_models: boolean = false;
  view_imagiologist_models: boolean = false;
  upload_doctor: boolean = false;

  private async getRole(): Promise<void> {
    const roles = await this.auth.getAllRoles();
    for (const role of roles) {
      if (role.id == this.role) {
        this.role = role.name;
      }
    }
    this.isAdmin = this.role === Constants.ROLE_ADMIN;
    this.isDoctor = this.role === Constants.ROLE_DOCTOR;
    this.isPatient = this.role === Constants.ROLE_PATIENT;
    this.isImagiologist = this.role === Constants.ROLE_IMAGIOLOGIST;
  }

  public async logout(): Promise<void> {
    await this.auth.logout();
  }

  goHome() {
    this.home_body = true;
    this.staff_requests = false;
    this.patients_requests = false;
    this.view_patient_models = false;
    this.view_imagiologist_models = false;
    this.upload_doctor = false;
  }

  showStaffRequests() {
    this.staff_requests = true;
    this.home_body = false;
    this.patients_requests = false;
    this.view_patient_models = false;
    this.view_imagiologist_models = false;
    this.upload_doctor = false;
  }

  showPatientRequests() {
    this.patients_requests = true;
    this.home_body = false;
    this.staff_requests = false;
    this.view_patient_models = false;
    this.view_imagiologist_models = false;
    this.upload_doctor = false;
  }

  showPatientModels() {
    this.view_patient_models = true;
    this.home_body = false;
    this.staff_requests = false;
    this.patients_requests = false;
    this.view_imagiologist_models = false;
    this.upload_doctor = false;
  }

  uploadDoctorModels() {
    this.upload_doctor = true;
    this.home_body = false;
    this.staff_requests = false;
    this.patients_requests = false;
    this.view_patient_models = false;
    this.view_imagiologist_models = false;
  }

  showImagiologistModels() {
    this.view_imagiologist_models = true;
    this.home_body = false;
    this.staff_requests = false;
    this.patients_requests = false;
    this.view_patient_models = false;
    this.upload_doctor = false;
  }
}
