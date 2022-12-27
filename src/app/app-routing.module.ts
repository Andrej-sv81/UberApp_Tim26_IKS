import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SafetyComponent } from './components/safety/safety.component';
import {MapComponent} from "./components/map/map.component";
import {RequestRideComponent} from "./components/request-ride/request-ride.component";

const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'help', component: HelpComponent},
  {path: 'safety', component: SafetyComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'requestride', component: RequestRideComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
