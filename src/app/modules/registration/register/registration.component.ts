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

  constructor(private router: Router, private regServ: RegistrationService){

  }

  register(){
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
        console.log(result);
      },
      error: (error)=>{
          console.log(error)
      }
    })

  }

}
