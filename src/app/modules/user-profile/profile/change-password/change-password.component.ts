import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/modules/registration/validator/match-validator';
import { ChangePassword } from '../../model/change-password';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required])
  },
  [CustomValidators.MatchValidator('newPassword', 'confirm')]);
  hasError: boolean = false;
  messageForm: string = "New password not matching!";
  messageServer: string = "Incorect old password or invalid new password!";
  errorMessage: string = '';

  constructor(private profile: ProfileService, private router: Router){}

  change():void{
    if(this.passwordForm.valid){
      const changePassword: ChangePassword ={
        newPassword: this.passwordForm.value.oldPassword,
        oldPassword: this.passwordForm.value.newPassword
      }
      this.profile.changePassword(changePassword).subscribe({
        // NE OVAKO!
        next: (result)=>{
          if(!this.hasError){
            this.hasError = false;
            this.router.navigate(['profile/info'])
          }
        },
        error: (error)=>{
          this.errorMessage= this.messageServer;
          this.hasError = true;
        }
      })
    }else{
      this.errorMessage = this.messageForm;
      this.hasError = true;
    }
  }
}

