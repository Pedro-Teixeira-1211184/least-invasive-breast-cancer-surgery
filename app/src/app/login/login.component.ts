import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";
import {AuthService} from "../service/auth/auth.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor() {
  }

  auth: AuthService = inject(AuthService);
  loginForm!: FormGroup;

  async ngOnInit(): Promise<void> {

    if (await this.auth.isAuthenticated()) {
      window.location.href = '/home';
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public async submit() {
    try {
      if (this.loginForm.invalid) {
        alert('Please fill all the fields');
        return;
      }
      await this.auth.login(this.email?.value, this.password?.value);
    } catch (e) {
      console.log(e);
    }
  }

  clearForm() {
    this.loginForm.reset();
  }
}
