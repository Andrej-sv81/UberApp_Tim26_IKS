import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../auth/token/token.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router, private token: TokenService){}
  public passenger: boolean = false;
  ngOnInit(): void
  {
   if(this.token.getUser().role === 'ROLE_PASSENGER'){
    this.passenger = true;
   }
  }

}
