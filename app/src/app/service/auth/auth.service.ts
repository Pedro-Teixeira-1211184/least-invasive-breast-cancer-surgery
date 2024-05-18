import {Injectable} from '@angular/core';
import Constants from "../../utils/Constants";
import IRoleDTO from "../../dto/IRoleDTO";

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
        localStorage.setItem('id', data.userDTO.id);
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
          localStorage.setItem('id', data.userDTO.id);
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
      const response = await fetch(Constants.API_AUTH_SIGNUP_REQUEST_URL, {
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

  public async deleteStaffRequest(email: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_REQUEST_DELETE_URL + email, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Request deleted');
      } else {
        alert('Error deleting request');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async deletePatientRequest(email: string, msg: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_REQUEST_DELETE_URL_PATIENT + email, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        if (msg === 'yes')
        alert('Request deleted');
      } else {
        alert('Error deleting request');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async signUpRequestPatient(firstName2: string, lastName2: string, sns: string, email2: string, password2: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_REQUEST_URL_PATIENT, {
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

  public async signUpStaff(firstName: string, lastName: string, email: string, password: string, role: string): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_STAFF_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role
        })
      });

      if (response.status === 201) {
        alert('User created');
        window.location.href = '/home';
      } else {
        alert('Error creating user');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async signUpPatient(firstName: string, lastName: string, email: string, password: string, role: string , sns: number): Promise<void> {
    try {
      const response = await fetch(Constants.API_AUTH_SIGNUP_PATIENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
          sns: sns
        })
      });

      if (response.status === 201) {
        alert('User created');
        await this.deletePatientRequest(email, 'no');
        window.location.href = '/home';
      } else {
        alert('Error creating user');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getAllRoles(): Promise<IRoleDTO[]> {
    try {
      const response = await fetch(Constants.API_GET_ROLES, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  public async getStaffRequests(): Promise<any> {
    try {
      const response = await fetch(Constants.API_GET_REQUESTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 403) {
        return [];
      }
      return await response.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  public async getPatientRequests(): Promise<any> {
    try {
      const response = await fetch(Constants.API_GET_REQUESTS_PATIENTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 403) {
        return [];
      }
      return await response.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('sns')
  }

}
