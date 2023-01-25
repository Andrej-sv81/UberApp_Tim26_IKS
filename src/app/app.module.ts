import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { SafetyComponent } from './components/safety/safety.component';
import { HelpComponent } from './components/help/help.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestRideComponent } from './components/request-ride/request-ride.component';
import {MapModule} from "./components/map/map.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
//import {HTTP_INTERCEPTORS} from "@angular/common/http"

//import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    HomeComponent,
    SafetyComponent,
    HelpComponent,
    RegistrationComponent,
    RequestRideComponent,
    //MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
