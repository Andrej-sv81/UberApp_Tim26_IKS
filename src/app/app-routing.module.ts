import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegistrationComponent } from './modules/registration/register/registration.component';
import { SafetyComponent } from './components/safety/safety.component';
import {MapComponent} from "./components/map/map.component";
import {RequestRideComponent} from "./components/request-ride/request-ride.component";
import { LoginGuard } from './modules/auth/guard/login.guard';
import { ActivationComponent } from './modules/account-activation/activation/activation.component';
const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, },
  {path: 'help', component: HelpComponent},
  {path: 'safety', component: SafetyComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'requestride', component: RequestRideComponent, canActivate:[LoginGuard]},
  {path: 'activate', component: ActivationComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
