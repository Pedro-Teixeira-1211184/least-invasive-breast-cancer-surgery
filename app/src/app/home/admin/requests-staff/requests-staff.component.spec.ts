import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestsStaffComponent} from './requests-staff.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../service/auth/auth.service";
import {ISignUpRequestDTO} from "../../../dto/ISignUpRequestDTO";
import IRoleDTO from "../../../dto/IRoleDTO";

describe('RequestsStaffComponent', () => {
  let component: RequestsStaffComponent;
  let fixture: ComponentFixture<RequestsStaffComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getStaffRequests',
      'getAllRoles',
      'signUpStaff',
      'deleteStaffRequest'
    ]);

    await TestBed.configureTestingModule({
      imports: [RequestsStaffComponent, CommonModule, FormsModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestsStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch requests on initialization', async () => {
    const mockRequests: ISignUpRequestDTO[] = [{
      domainId: "1",
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: "test"
    }];
    authService.getStaffRequests.and.resolveTo(mockRequests);

    fixture.detectChanges();

    expect(authService.getPatientRequests).toHaveBeenCalled();
  });

  it('should fetch roles on initialization', async () => {
    const mockRoles: IRoleDTO[] = [{id: '1', name: 'Doctor'}];
    authService.getAllRoles.and.resolveTo(mockRoles);

    fixture.detectChanges();

    expect(authService.getAllRoles).toHaveBeenCalled();
    expect(component.roles).toEqual(mockRoles);
  });

  it('should accept request', async () => {
    const mockRequest: ISignUpRequestDTO & { role: string } = {
      domainId: "1",
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: "test",
      role: 'Doctor'
    };
    authService.signUpStaff.and.resolveTo();

    await component.accept(mockRequest);

    expect(authService.signUpStaff).toHaveBeenCalledWith(mockRequest.firstName, mockRequest.lastName, mockRequest.email, mockRequest.password, mockRequest.role);
    expect(component.requests).toEqual([]);
    expect(authService.getStaffRequests).toHaveBeenCalled();
  });

  it('should deny request', async () => {
    const mockRequest: ISignUpRequestDTO & { role: string } = {
      domainId: "1",
      firstName: 'John',
      lastName: 'Doe',
      email: 'joe@test.com',
      password: "test",
      role: 'Doctor'
    };
    authService.deleteStaffRequest.and.resolveTo();

    await component.deny(mockRequest);

    expect(authService.deleteStaffRequest).toHaveBeenCalledWith(mockRequest.email);
    expect(component.requests).toEqual([]);
    expect(authService.getStaffRequests).toHaveBeenCalled();
  });

  it('should not accept request if role is not defined', async () => {
    const mockRequest: ISignUpRequestDTO & { role: string } = {
      domainId: "1",
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: "test",
      role: ''
    };

    authService.signUpStaff.and.resolveTo();

    await component.accept(mockRequest);

    expect(authService.signUpStaff).not.toHaveBeenCalled();
    expect(component.requests).toEqual([]);
    expect(authService.getStaffRequests).toHaveBeenCalled();

  });
});
