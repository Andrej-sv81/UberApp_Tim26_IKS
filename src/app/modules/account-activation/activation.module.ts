import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivationComponent } from './activation/activation.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ActivationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ActivationModule { }
