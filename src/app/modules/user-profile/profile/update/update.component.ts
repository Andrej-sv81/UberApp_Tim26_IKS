import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PassengerUpdate } from '../../model/passanger-update-req';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  updateForm = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    picture: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    address: new FormControl()
  });

  hasError: boolean = false;

  constructor(private profile: ProfileService, private router: Router){}


  update():void{
    const passenger: PassengerUpdate = {
      name: this.updateForm.value.name === null ? '': this.updateForm.value.name,
      surname: this.updateForm.value.surname  === null ? '': this.updateForm.value.surname,
      profilePicture: this.updateForm.value.picture  === null ? '': this.updateForm.value.picture,
      telephoneNumber: this.updateForm.value.phone  === null ? '': this.updateForm.value.phone,
      email: this.updateForm.value.email  === null ? '': this.updateForm.value.email,
      address: this.updateForm.value.address  === null ? '': this.updateForm.value.address,
    }
    this.profile.updatePassenger(passenger).subscribe({
      next: (result)=>{
          this.router.navigate(['profile/info']);
      },
      error: (error)=>{
        this.hasError = true;
      }
    })
  }
}
