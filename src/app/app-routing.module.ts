import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegistrationComponent } from './modules/passenger/registration/register/registration.component';
import { SafetyComponent } from './components/safety/safety.component';
import {MapComponent} from "./components/map/map.component";
import {RequestRideComponent} from "./modules/passenger/request-ride/request-ride.component";
import { LoginGuard } from './modules/auth/guard/login.guard';
import { ActivationComponent } from './modules/passenger/account-activation/activation/activation.component';
import { ProfileComponent } from './modules/passenger/user-profile/profile/profile.component';
import { InfoComponent } from './modules/passenger/user-profile/profile/info/info.component';
import { HistoryComponent } from './modules/passenger/user-profile/profile/history/history.component';
import { FavoritesComponent } from './modules/passenger/user-profile/profile/favorites/favorites.component';
import { UpdateComponent } from './modules/passenger/user-profile/profile/update/update.component';
import { ChangePasswordComponent } from './modules/passenger/user-profile/profile/change-password/change-password.component';
import {AcceptDeclineRideComponent} from "./modules/driver/accept-decline-ride/accept-decline-ride.component";
import {CurrentRidePassengerComponent} from "./modules/passenger/current-ride-passenger/current-ride-passenger.component";
import {CurrentRideDriverComponent} from "./modules/driver/current-ride-driver/current-ride-driver.component";
import {UnregisteredComponent} from "./modules/unregistered/unregistered.component";
import {DriverHomeComponent} from "./modules/driver/driver-home/driver-home.component";
import { PasswordResetComponent } from './modules/passenger/password-reset/password-reset.component';
import { ReviewComponent } from './modules/passenger/user-profile/profile/review/review.component';
import {DriverStartRideComponent} from "./modules/driver/driver-start-ride/driver-start-ride.component";


const routes: Routes = [
  {path: '', redirectTo: "unregistered", pathMatch: 'full'},
  {path: 'unregistered', component: UnregisteredComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset', component: PasswordResetComponent},
  {path: 'home', component: HomeComponent, },
  {path: 'driver-home', component:DriverHomeComponent},
  {path: 'help', component: HelpComponent},
  {path: 'safety', component: SafetyComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'request-ride', component: RequestRideComponent},
  {path: 'activate', component: ActivationComponent},
  {path: 'accept-decline-ride/:rideId', component: AcceptDeclineRideComponent},
  {path: 'current-ride-passenger', component: CurrentRidePassengerComponent},
  {path: 'current-ride-driver', component: CurrentRideDriverComponent},
  {path: 'start-ride-driver', component:DriverStartRideComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[LoginGuard], children:[
      {path: 'info', component: InfoComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'update', component: UpdateComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'review/:id', component: ReviewComponent},
      {path: 'reports', component: ReportsComponent},
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: '**', component: InfoComponent},
  ]},
  {path: '**', component: UnregisteredComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
