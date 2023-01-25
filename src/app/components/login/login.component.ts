import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private http: HttpClient){}

  redirectFromToolbar(route: string) {
    this.router.navigate([route]);
  }

  login(){
    
  }

}
