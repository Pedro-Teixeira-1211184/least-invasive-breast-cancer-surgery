import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignupComponent} from "./signup/signup.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: PageNotFoundComponent} // Rota para página não encontrada
];
