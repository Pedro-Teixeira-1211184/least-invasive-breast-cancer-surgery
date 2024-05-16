import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  auth: AuthService = inject(AuthService);
  loginForm!: FormGroup;
  loginForm2!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginForm2 = new FormGroup({
      firstName2: new FormControl('', [Validators.required]),
      lastName2: new FormControl('', [Validators.required]),
      sns: new FormControl('', [Validators.required]),
      email2: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    });
  }

  get firstName() {
    return this.loginForm.get('firstName');
  }

  get lastName() {
    return this.loginForm.get('lastName');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get firstName2() {
    return this.loginForm2.get('firstName2');
  }

  get lastName2() {
    return this.loginForm2.get('lastName2');
  }

  get sns() {
    return this.loginForm2.get('sns');
  }

  get email2() {
    return this.loginForm2.get('email2');
  }

  get password2() {
    return this.loginForm2.get('password2');
  }

  public async submit() {
    try {
      if (this.loginForm.invalid) {
        alert('Please fill all the fields');
        return;
      }
      await this.auth.signUpRequestUser(this.firstName?.value, this.lastName?.value, this.email?.value, this.password?.value);
    } catch (e) {
      console.log(e);
    }
  }

  public async submit2() {
    try {
      if (this.loginForm2.invalid) {
        alert('Please fill all the fields');
        return;
      }
      await this.auth.signUpRequestPatient(this.firstName2?.value, this.lastName2?.value, this.sns?.value, this.email2?.value, this.password2?.value);
    } catch (e) {
      console.log(e);
    }
  }
}
