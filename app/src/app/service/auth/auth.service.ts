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
    return localStorage.getItem('token') !== null;
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
