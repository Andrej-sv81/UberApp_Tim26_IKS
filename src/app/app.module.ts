import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { SafetyComponent } from './components/safety/safety.component';
import { HelpComponent } from './components/help/help.component';
import { RequestRideComponent } from './components/request-ride/request-ride.component';
import { MapModule } from "./components/map/map.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Interceptor } from './modules/auth/interceptor/interceptor.service';
import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { RegistrationModule } from './modules/registration/registration.module';
import { SecurityModule } from './modules/auth/auth.module';
import { ActivationModule } from './modules/account-activation/activation.module';
//import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    SafetyComponent,
    HelpComponent,
    RequestRideComponent,
    //MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapModule,
    CommonModule,
    HttpClientModule,
    RegistrationModule,
    SecurityModule,
    ActivationModule
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
