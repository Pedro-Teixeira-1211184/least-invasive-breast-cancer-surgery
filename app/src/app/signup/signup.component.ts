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

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
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

}
