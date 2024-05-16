import {Component, inject} from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgIf

  ],
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() {
  }

  ngOnInit(): void {
    this.getRole();
  }

  auth: AuthService = inject(AuthService);
  role = localStorage.getItem('role');

  home_body: boolean = true;

  private async getRole(): Promise<void> {
    const roles = await this.auth.getAllRoles();
    for (const role of roles) {
      if (role.id == this.role) {
        this.role = role.name;
      }
    }
  }

  public async logout(): Promise<void> {
    await this.auth.logout();
  }

  public async goHome() {
    console.log('go home');
  }
}
