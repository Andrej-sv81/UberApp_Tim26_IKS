import { Component } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivationService } from '../activation.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent {
  idForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });
  hasError: boolean = false;

  constructor(private router: Router, private actServ: ActivationService) {}

  activate() {
    if (this.idForm.valid) {
      const id: string =
        this.idForm.value.id == null ? '' : this.idForm.value.id;
      this.actServ.activateAccount(id).subscribe({
        next: (result) => {
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.hasError = true;
        },
      });
    } else {
      this.hasError = true;
    }
  }
}
