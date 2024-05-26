import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {AuthService} from "../service/auth/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'signUpRequestUser',
      'signUpRequestPatient'
    ]);
    await TestBed.configureTestingModule({
      imports: [SignupComponent, CommonModule, ReactiveFormsModule]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit user signup request', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password'
    };
    authService.signUpRequestUser.and.resolveTo();

    await component.submit();

    expect(authService.signUpRequestUser).toHaveBeenCalledWith(formData.firstName, formData.lastName, formData.email, formData.password);
  });

  it('should submit patient signup request', async () => {
    const formData = {
      firstName2: 'John',
      lastName2: 'Doe',
      sns: '123456789',
      email2: 'john@example.com',
      password2: 'password'
    };
    authService.signUpRequestPatient.and.resolveTo();

    await component.submit2();

    expect(authService.signUpRequestPatient).toHaveBeenCalledWith(formData.firstName2, formData.lastName2, formData.sns, formData.email2, formData.password2);
  });

  it('should show alert if user signup form is invalid', () => {
    spyOn(window, 'alert');
    component.loginForm.setValue({ firstName: '', lastName: '', email: '', password: '' });

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Please fill all the fields');
  });

  it('should show alert if patient signup form is invalid', () => {
    spyOn(window, 'alert');
    component.loginForm2.setValue({ firstName2: '', lastName2: '', sns: '', email2: '', password2: '' });

    component.submit2();

    expect(window.alert).toHaveBeenCalledWith('Please fill all the fields');
  });
});
