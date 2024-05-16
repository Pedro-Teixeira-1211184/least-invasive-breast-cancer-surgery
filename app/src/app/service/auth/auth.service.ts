import {Injectable} from '@angular/core';
import Constants from "../../utils/Constants";
import {IUserDTO} from "../../dto/IUserDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user logged in
  public userEmail: string | null = null;

  constructor() {
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.status === 200) {
        const data = await response.json();
        //redirect to home page of a certain user role
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.userDTO.role);
        localStorage.setItem('email', data.userDTO.email);
        localStorage.setItem('firstName', data.userDTO.firstName);
        localStorage.setItem('lastName', data.userDTO.lastName);
        window.location.href = '/home';
      } else {
        const response = await fetch(Constants.API_AUTH_LOGIN_URL_PATIENT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        if (response.status === 200) {
          const data = await response.json();
          //redirect to home page of a certain user role
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.userDTO.role);
          localStorage.setItem('email', data.userDTO.email);
          localStorage.setItem('firstName', data.userDTO.firstName);
          localStorage.setItem('lastName', data.userDTO.lastName);
          localStorage.setItem('sns', data.userDTO.sns);
          window.location.href = '/home';
        } else {
          alert('Invalid credentials');
          window.location.href = '/';
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async logout(): Promise<void> {
    this.clearLocalStorage();
    window.location.href = '/login';
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      return localStorage.getItem('token') !== null;
    } catch (e) {
      return false;
    }
  }

  public async signUpRequestUser(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      });

      if (response.status === 201) {
        alert('Request sent');
        window.location.href = '/';
      } else {
        alert('Error creating request');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async signUpRequestPatient(firstName2: string, lastName2: string, sns: string, email2: string, password2: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_URL_PATIENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName2,
          lastName: lastName2,
          email: email2,
          password: password2,
          sns: sns
        })
      });

      if (response.status === 201) {
        alert('Request sent');
        window.location.href = '/';
      } else {
        alert('Error creating request');
      }
    } catch (e) {
      console.log(e);
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('nif')
  }

}
