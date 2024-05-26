import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../service/auth/auth.service";
import {ISignUpRequestDTO} from "../../../dto/ISignUpRequestDTO";
import IRoleDTO from "../../../dto/IRoleDTO";
import Constants from "../../../utils/Constants";

@Component({
  selector: 'app-requests-staff',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './requests-staff.component.html',
  styleUrl: './requests-staff.component.css'
})
export class RequestsStaffComponent implements OnInit {

  auth_service: AuthService = inject(AuthService);
  requests: (ISignUpRequestDTO & { role: string })[] = [];
  roles: IRoleDTO[] = [];
  noRequests: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.getAllRequests();
    this.getAllRoles();
  }

  private async getAllRequests(): Promise<void> {
    this.requests = await this.auth_service.getStaffRequests();
    this.noRequests = this.requests.length == 0;
  }

  private async getAllRoles(): Promise<void> {
    this.roles = await this.auth_service.getAllRoles();
    //remove patient role
    this.roles = this.roles.filter(role => role.name !== Constants.ROLE_PATIENT);
  }

  public async accept(request: ISignUpRequestDTO & { role: string }): Promise<void> {
    if (request.role != null || request.role != undefined) {
      await this.auth_service.signUpStaff(request.firstName, request.lastName, request.email, request.password, request.role)
    }
    //refresh content
    this.requests = [];
    await this.getAllRequests();
  }

  public async deny(request: ISignUpRequestDTO & { role: string }): Promise<void> {
    await this.auth_service.deleteStaffRequest(request.email)
    //refresh content
    this.requests = [];
    await this.getAllRequests();
  }

}
