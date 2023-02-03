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
import { ProfileComponent } from './modules/user-profile/profile/profile.component';
import { InfoComponent } from './modules/user-profile/profile/info/info.component';
import { HistoryComponent } from './modules/user-profile/profile/history/history.component';
import { FavoritesComponent } from './modules/user-profile/profile/favorites/favorites.component';
import { UpdateComponent } from './modules/user-profile/profile/update/update.component';
import { ChangePasswordComponent } from './modules/user-profile/profile/change-password/change-password.component';
const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, },
  {path: 'help', component: HelpComponent},
  {path: 'safety', component: SafetyComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'requestride', component: RequestRideComponent, canActivate:[LoginGuard]},
  {path: 'activate', component: ActivationComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[LoginGuard], children:[
      {path: 'info', component: InfoComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'update', component: UpdateComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: '**', component: InfoComponent}
  ]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
