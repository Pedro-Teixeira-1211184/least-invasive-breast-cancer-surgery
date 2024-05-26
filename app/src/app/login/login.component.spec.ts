import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../service/auth/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

class MockAuthService {
  isAuthenticated() {
    return Promise.resolve(false);
  }

  login(email: string, password: string) {
    return Promise.resolve(true);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.email).toBeDefined();
    expect(component.password).toBeDefined();
  });

  it('should have email and password inputs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[type="email"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should call submit method', async () => {
    spyOn(component, 'submit');
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should clear form', () => {
    component.loginForm.setValue({email: 'test@test.com', password: 'password'});
    component.clearForm();
    expect(component.loginForm.value).toEqual({email: null, password: null});
  });

  it('should show error message when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.loginForm.controls['email'].markAsTouched();
    fixture.detectChanges();
    const errorMsg = compiled.querySelector('.error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg?.textContent).toContain('Email is required.');
  });
});
