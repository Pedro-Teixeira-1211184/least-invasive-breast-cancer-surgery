import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../service/auth/auth.service";
import {ISignUpRequestPatientDTO} from "../../../dto/ISignUpRequestPatientDTO";

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

  constructor() {
  }

  ngOnInit(): void {
    this.getAllRequests();
  }

  private async getAllRequests(): Promise<void> {
    this.requests = await this.auth_service.getPatientRequests();
    this.noRequests = this.requests.length == 0;
  }

  public async accept(request: ISignUpRequestPatientDTO): Promise<void> {
    const role = localStorage.getItem('role');
    if (role == null) {
      return;
    }
    await this.auth_service.signUpPatient(request.firstName, request.lastName, request.email, request.password, role, request.sns);
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
