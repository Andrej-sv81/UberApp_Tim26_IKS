import { Component } from '@angular/core';
import { ProfileService } from '../user-profile/profile.service';
import { PasswordCode } from '../user-profile/model/password-code'
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {

  email: string = ''
  code: string = ''
  newPassword: string = ''

  change: boolean = false;

  constructor(private service: ProfileService, private router: Router){}

  submitForm(){
    this.service.resetEmailRequest(this.email);
    this.change = true;
  }

  resetPassword(){
    if(this.newPassword !== '' && this.code !== ''){
      let body: PasswordCode = {
        newPassword: this.newPassword,
        code: this.code
      }
      this.service.resetPassword(this.email, body).subscribe((result)=>{

      })

      
    }
    this.router.navigate(['login'])
  }

}
