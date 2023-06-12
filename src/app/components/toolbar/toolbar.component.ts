import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { TokenService } from 'src/app/modules/auth/token/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{


  constructor(private auth: AuthService, private router: Router, private token: TokenService){}

  public logged: boolean = false;
  public role: string = "";

  ngOnInit(): void {
    this.auth.userState$.subscribe( (result) =>{
      this.logged = result;
    })
  }

  homeRoute() {
    if(this.logged){
      this.role = this.token.getUser().role;

      if(this.role === "ROLE_PASSENGER"){
        this.router.navigate(["/request-ride"]);

      }else if(this.role === "ROLE_DRIVER"){
        this.router.navigate(["/driver-home"])
      }
    }
    }
  
    

}
