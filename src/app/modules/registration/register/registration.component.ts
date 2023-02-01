import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from '../passenger-request-model/passenger';
import { RegistrationService } from '../registration.service';
import { CustomValidators } from '../validator/match-validator'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  },
  [CustomValidators.MatchValidator('password', 'confirmPassword')]);

  hasError: boolean = false;
  message: string = "Please check your email for account activation link";
  constructor(private router: Router, private regServ: RegistrationService){

  }

  register(){
    if(this.registrationForm.valid){
    const passenger: Passenger = {
      name: this.registrationForm.value.name,
      surname: this.registrationForm.value.surname,
      profilePicture: '',
      telephoneNumber: this.registrationForm.value.phone,
      email: this.registrationForm.value.email,
      address: this.registrationForm.value.address,
      password: this.registrationForm.value.password
    }

    this.regServ.signUp(passenger).subscribe({
      next: (result) =>{
        this.router.navigate(['activate'])
      },
      error: (error)=>{
          if(error instanceof HttpErrorResponse){
            this.message = "The provided user information is not valid!"
            this.hasError = true;
          }
        }
      })
    }else{
      this.message = "All fileds are required and passwords must match!"
      this.hasError = true;
    }
  }

}
