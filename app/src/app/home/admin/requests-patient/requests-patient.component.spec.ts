import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestsPatientComponent} from './requests-patient.component';
import {AuthService} from "../../../service/auth/auth.service";
import {ISignUpRequestPatientDTO} from "../../../dto/ISignUpRequestPatientDTO";
import {of} from "rxjs";

describe('RequestsPatientComponent', () => {
  let component: RequestsPatientComponent;
  let fixture: ComponentFixture<RequestsPatientComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getPatientRequests', 'signUpPatient', 'deletePatientRequest']);

    await TestBed.configureTestingModule({
      imports: [RequestsPatientComponent],
      providers: [
        {provide: AuthService, useValue: authServiceSpy}
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(RequestsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllRequests method on initialization', () => {
    const requests: ISignUpRequestPatientDTO[] = [{
      domainId: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'password',
      sns: 123
    }, {domainId: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@test.com', password: 'password', sns: 456}];
    authService.getPatientRequests.and.returnValue(Promise.resolve(requests));

    fixture.detectChanges();

    expect(authService.getPatientRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(requests);
  });

  it('should call accept method on clicking Accept button', () => {
    const request: ISignUpRequestPatientDTO = {
      domainId: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'password',
      sns: 123
    };
    authService.getPatientRequests.and.returnValue(Promise.resolve([request]));

    fixture.detectChanges();

    const acceptButton = fixture.nativeElement.querySelector('#approve-but');
    acceptButton.click();

    expect(authService.signUpPatient).toHaveBeenCalledWith(request.firstName, request.lastName, request.email, request.password, jasmine.any(String), request.sns);
  });

  it('should call deny method on clicking Deny button', () => {
    const request: ISignUpRequestPatientDTO = {
      domainId: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'password',
      sns: 123
    };
    authService.getPatientRequests.and.returnValue(Promise.resolve([request]));

    fixture.detectChanges();

    const denyButton = fixture.nativeElement.querySelector('#deny-but');
    denyButton.click();

    expect(authService.deletePatientRequest).toHaveBeenCalledWith(request.email, 'yes');
  });
});
