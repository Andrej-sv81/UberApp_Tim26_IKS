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
  uploading: boolean = false;
  selectedFile: File | null = null;
  fileData: string | null = null;

  constructor(private profile: ProfileService, private router: Router){}

  onFileSelected($event: any): void {
      this.selectedFile = $event.target.files[0];
      this.uploading = true; //sakrivanje dugmeta u slucaju sporog upload-a
      this.readData();
      this.uploading = false;
  }

  readData(){
    const reader = new FileReader();
    if(this.selectedFile !== null){
      reader.readAsDataURL(this.selectedFile);
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          this.fileData = reader.result as string;
        }
      }
    }  
  }

  update():void{

    const passenger: PassengerUpdate = {
      name: this.updateForm.value.name === null ? '': this.updateForm.value.name,
      surname: this.updateForm.value.surname  === null ? '': this.updateForm.value.surname,
      profilePicture: this.fileData  === null ? '': this.fileData,
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
