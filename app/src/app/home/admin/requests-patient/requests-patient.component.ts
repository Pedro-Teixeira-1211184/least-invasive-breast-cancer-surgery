import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../service/auth/auth.service";
import {ISignUpRequestPatientDTO} from "../../../dto/ISignUpRequestPatientDTO";
import IRoleDTO from "../../../dto/IRoleDTO";
import Constants from "../../../utils/Constants";

@Component({
  selector: 'app-requests-patient',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './requests-patient.component.html',
  styleUrl: './requests-patient.component.css'
})
export class RequestsPatientComponent implements OnInit {

  auth_service: AuthService = inject(AuthService);
  requests: ISignUpRequestPatientDTO[] = [];
  noRequests: boolean = false;
  role: IRoleDTO | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.getAllRequests();
    this.getRole();
  }

  private async getAllRequests(): Promise<void> {
    this.requests = await this.auth_service.getPatientRequests();
    this.noRequests = this.requests.length == 0;
  }

  private async getRole(): Promise<void> {
    let roles = await this.auth_service.getAllRoles();
    //remove patient role
    roles = roles.filter(role => role.name == Constants.ROLE_PATIENT);
    this.role = roles[0];
  }

  public async accept(request: ISignUpRequestPatientDTO): Promise<void> {
    if (this.role == null) {
      return;
    }
    await this.auth_service.signUpPatient(request.firstName, request.lastName, request.email, request.password, this.role.id, request.sns);
    //refresh content
    this.requests = [];
    await this.getAllRequests();
  }

  public async deny(request: ISignUpRequestPatientDTO): Promise<void> {
    await this.auth_service.deletePatientRequest(request.email, 'yes')
    //refresh content
    this.requests = [];
    await this.getAllRequests();
  }

}
