import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { TokenService } from 'src/app/modules/auth/token/token.service';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit{
  name: string = '';
  surname: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  imageData: string = '';
  
  hasError: boolean =  false;
  imglink: any;

  constructor(private token: TokenService, private router: Router,
              private profile: ProfileService, private auth: AuthService) {}
  ngOnInit(): void
  {
    this.profile.loadPassenger().subscribe({
      next: (result) => {
          this.name = result.name;
          this.surname = result.surname;
          this.phone = result.telephoneNumber;
          this.email =result.email;
          this.address = result.address;
          this.imageData = result.profilePicture;
      },
      error: (error)=>{
          this.hasError = true;
      }
    })
    
  }

  logut() {
    this.token.signOut();
    this.auth.user$.next(false);
    this.router.navigate(['login']);
  }

  openDialog(){
    this.router.navigate(['profile/update']);
  }

  
}
